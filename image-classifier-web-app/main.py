from requirements import *

# Load the ResNet50 model.
model = models.resnet50(weights='ResNet50_Weights.DEFAULT')

# Set the model to evaluation mode
model.eval() 

# Define the image transformation 
transform = transforms.Compose(
    [
        transforms.Resize(256)
        , transforms.CenterCrop(224)
        , transforms.ToTensor()
        , transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ]
)

# Load the labels for ImageNet classes 
LABELS_URL = "https://raw.githubusercontent.com/anishathalye/imagenet-simple-labels/master/imagenet-simple-labels.json" 
labels = requests.get(LABELS_URL).json() 

# Load and preprocess the one single image
# image_path = 'data\\images\\sample_04.JPG'
# image_path = 'data\\images\\sample_01.jpg'
# image_path = 'data\\images\\sample_02.HEIC'
# image = Image.open(image_path)
# image = transform(image).unsqueeze(0)

# Feed the image to the model 
# with torch.no_grad(): 
#     output = model(image) 

# Get the predicted class
# _, predicted_class = torch.max(output, 1) 
# predicted_class = predicted_class.item()

# Get the predicted label 
# predicted_label = labels[predicted_class] 
# print(f'Predicted label: {predicted_label}')

# Load and preprocess the multiple image in path 
image_path = 'data\\images'
for image_file in os.listdir(image_path):
    if image_file.endswith((
        '.heic'
        , '.HEIC'
    )):
        print(f'image_file: {image_file}\nSystem Does Not Support {image_file.split(".")[1]} format. Read available supported formats by running ``python3 -m PIL``\n')
        pass
    elif image_file.endswith((
        '.png'
        , '.PNG'
    )):
        print(f'image_file: {image_file}')
        raise RuntimeError('The size of tensor a (4) must match the size of tensor b (3) at non-singleton dimension 0')
    else:
        image = Image.open(os.path.join(image_path, image_file))
        image = transform(image).unsqueeze(0)

        # Feed the image to the model 
        with torch.no_grad(): 
            output = model(image) 

        # Get the predicted class
        _, predicted_class = torch.max(output, 1) 
        predicted_class = predicted_class.item()

        # Get the predicted label 
        predicted_label = labels[predicted_class] 
        print(f'image_file: {image_file}\npredicted_class: {predicted_class}\nPredicted label: {predicted_label}\n')
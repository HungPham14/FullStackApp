from requirements import *

# Load the ResNet50 model.
model = models.resnet50(weights='ResNet50_Weights.DEFAULT')

# Set the model to evaluation mode
model.eval() 

# Define the image transformation 
transform = transforms.Compose(
    [ transforms.Resize(256)
     , transforms.CenterCrop(224)
     , transforms.ToTensor()
     , transforms.Normalize(
        mean=[0.485, 0.456, 0.406]
        , std=[0.229, 0.224, 0.225]
     ), ]
)

# Load and preprocess the image
image_path = 'data\\images\\sample_01.jpg'
image = Image.open(image_path)
image = transform(image).unsqueeze(0)

# Feed the image to the model 
with torch.no_grad(): 
    output = model(image) 

# Get the predicted class
_, predicted_class = torch.max(output, 1) 
predicted_class = predicted_class.item()

# Load the labels for ImageNet classes 
LABELS_URL = "https://raw.githubusercontent.com/anishathalye/imagenet-simple-labels/master/imagenet-simple-labels.json" 
labels = requests.get(LABELS_URL).json() 

# Get the predicted label 
predicted_label = labels[predicted_class] 
print(f'Predicted label: {predicted_label}')
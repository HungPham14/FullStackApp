from requirements import *

# sample
class RunTrackerApp(App):
    def build(self):
        layout = BoxLayout(orientation='vertical')
        self.label = Label(text="Run Tracker")
        start_button = Button(text="Start Run",background_color=[1,0,0,1])
        stop_button = Button(text="Stop Run")
        
        layout.add_widget(self.label)
        layout.add_widget(start_button)
        layout.add_widget(stop_button)
        
        start_button.bind(on_press=self.start_run)
        stop_button.bind(on_press=self.stop_run)
        
        return layout
    
    def start_run(self, instance):
        self.label.text = "Run Started"
        # Add GPS tracking logic here
    
    def stop_run(self, instance):
        self.label.text = "Run Stopped"
        # Add logic to stop GPS tracking and calculate distance/time

if __name__ == '__main__':
    RunTrackerApp().run()
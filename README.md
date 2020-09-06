# indoor_simulation

Prototype app for the Indoor Positioning System proposed in the Master's Thesis ,,Detection and Positioning of Barriers to Augment Indoor Maps''.

Start instructions
	Server start: navigate to /backend/src and run command: python manage.py runserver
	Client start: navigate to /frontend/gui and run command: npm start
	

Packages
	- install the required packages in /backend and /frontend by running the command npm -r install "requirements.txt" for the both directories
	- for the Neural Netowork the packages torch and torchvision have to be installed

Before running the app, make sure that the NN model is added to the directory /backend/nn. The model used is the file result_model20200618-1216 included in the submitted documents. The path to the model has to be manually specified in the file /backend/nn/model_loader.py

Using the images in the folder nn_images are recommended to be uploaded in the app as with the use of these images correct positioning on the map can be ensured.


# indoor_simulation

Prototype app for the Indoor Positioning System proposed in the Master's Thesis ,,Detection and Positioning of Barriers to Augment Indoor Maps''.

Start Instructions 

Installing required packages
1. install pip
2. go to /backend
3. run 'pip install -r "requirements.txt"
4. go to /frontend
5. run 'pip install -r "requirements.txt"

NN preparation

1. torch and torchvision packages have to be installed on the system.
2. add file result_model20200618-1216 to /backend/nn directory (the file result_model20200618-1216 is included in the submitted documents)
3. specify path to the result_model20200618-1216 in /backend/nn/model.py 
Remark: each time an image is uploaded, the name of the image has to be unique!

Start Server

1. go to /backend/src
2. run 'python3 manage.py runserver'


Start Client

1. go to /frontend/gui
2. run 'npm start'

For problems with 'npm start' uninstall and reinstall the project dependencies with 
1. rm -rf node_modules
2. run 'npm install'
3. run 'npm start'


Apply changes to database:
1. go to backend/src
2. run 'python manage.py makemigrations'
3. run 'python manage.py migrate'



 Testing out: The images in the folder nn_images are recommended to be uploaded in the app as the use of these images can currently ensure correct positioning on the map.


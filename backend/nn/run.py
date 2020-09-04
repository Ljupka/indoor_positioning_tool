from predictor import predict
import torch
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
import os
import csv
import time

def get_instance_segmentation_model(num_classes):
    model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)

    # get the number of input features for the classifier
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    # replace the pre-trained head with a new one
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

    return model



# model 4 
model = get_instance_segmentation_model(8)
print("after model in run")
#model.load_state_dict(torch.load("result_model"))

model.load_state_dict(torch.load("result_model20200618-1216"))

model.eval()

#predict(model, 'frame_s3_562.jpg')


file_read = open('testset_groundtruth.csv', mode='r')
reader = csv.reader(file_read, delimiter=',')


file_write = open('testset_predictions.csv', mode='w', newline='')
writer = csv.writer(file_write)

"""
for column in reader:

	#print("column is ", column[0])

	start = time.time()
	predict(model, column[0], writer)
	end = time.time()

	result_time = end - start
	print("time is ", result_time)

	"""

#rootdir = 'C:/Users/Ljupka/Desktop/New NN/indooro/Indoor_Object_Detection_Dataset/Images/Test'
rootdir = os.getcwd() + 'Indoor_Object_Detection_Dataset/Images/Test'
print("rootdir is ", rootdir)

for  subdir, dirs,files in os.walk(rootdir):
	for file in files:
		#start = time.time()
		#print("file name ", file)

		predict(model, file, writer)
		#end = time.time()

		#result_time = end - start
		#print("time is ", result_time)







"""
model2 = get_instance_segmentation_model(7)
print("after model in run")
#model.load_state_dict(torch.load("result_model"))

model2.load_state_dict(torch.load("result_model"))

model2.eval()


predict(model2, 'frame_s3_562.jpg')
"""








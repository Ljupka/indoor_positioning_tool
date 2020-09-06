from predictor import predict
import torch
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
import os
import csv
import time
import sys 



def get_instance_segmentation_model(num_classes):
    model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)

    # get the number of input features for the classifier
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    # replace the pre-trained head with a new one
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

    return model


def load_model():
	
	model = get_instance_segmentation_model(8)
	print("model started")

	# directory where the model is stored
	dir = 'C:/Users/Ljupka/Desktop/App/indoor_simulation/backend/nn/'


	model.load_state_dict(torch.load(dir + "result_model20200618-1216"))

	model.eval()

	return model;

from torchvision import transforms
from PIL import Image

import math 
from PIL import Image, ImageDraw 
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os
import torch



COCO_INSTANCE_CATEGORY_NAMES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus',
    'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'N/A', 'stop sign',
    'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'N/A', 'backpack', 'umbrella', 'N/A', 'N/A',
    'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball',
    'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
    'bottle', 'N/A', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl',
    'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza',
    'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'N/A', 'dining table',
    'N/A', 'N/A', 'toilet', 'N/A', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
    'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'N/A', 'book',
    'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
]

label_categories = ['','screen', 'clock', 'chair', 'bin', 'exit', 'printer', 'fireextinguisher']


# draw bounding boxes on the image
def show_boxes (image_name, boxes, labels, scores):

	print("show boxes called")

	# convert tensor to list
	boxes_list = boxes.tolist()

	im = Image.open(image_name)

	# Display the image
	#plt.imshow(im)
	plt.figure(figsize = (50,25))
	plt.imshow(im, interpolation='nearest')


	# Get the current reference
	ax = plt.gca()

	i = 0
	offset_x1 = 20
	offset_y1 = 20

	offset_x2 = 20
	offset_y2 = 20
	for box in boxes_list:

		# get coordinates of the box
		xmin = box[0]

		ymin = box[1]

		xmax = box[2]

		ymax = box[3]

		# format the box 
		box_left = xmin
		box_top = ymin
		box_width = xmax - xmin
		box_height = ymax - ymin

		# box label
		lbl = labels[i]
		
		# score
		print("type is ", type(scores[i]))
		s = round(float(scores[i]), 3)
		i = i + 1


		#print("label is ", lbl)

		# draw rectangle on the image
		r =  patches.Rectangle((box_left,box_top),box_width,box_height,linewidth=7,edgecolor='r',facecolor='none', label='LABEL')



		# Add the patch to the Axes
		ax.add_artist(r)

		

		# annotate the rectangle with label
		rx, ry = r.get_xy()
		cx = rx  - 30
		cy = ry - 10


		# annotate the rectangle with score
		print("Lbl is ", lbl)
		if lbl == "fireextinguisher" or lbl == 'trashbin' or lbl == 'printer':
			cx2 = cx - 170
		elif lbl == "exit" or lbl == 'clock' or lbl == 'chair':
			cx2 = cx + 110
		elif lbl == "screen":
			cx2 = cx + 120
			cy2 = cy + 50 
			
		cy2 = cy 


		ax.annotate(lbl, (cx, cy), color='r', fontsize=50, ha='center', va='center')
		ax.annotate(s, (cx2, cy2), color='r', fontsize=50, ha='center', va='center')

	



       



# function to predict on image with bounding boxes output
def predict (model, img_name, write_file):

	#rootdir = 'C:/Users/Ljupka/Desktop/New NN/indooro/Indoor_Object_Detection_Dataset/Images/Test'
	trans = transforms.ToTensor()

	#img_path = os.path.join(rootdir, img_name)
	
	
	img_path = img_name

	img = Image.open(img_path).convert("RGB")
	img = trans(img)
	model.eval()

	predictions = model([img])


	list_elem = predictions[0]

	boxes_tensor = list_elem["boxes"]


	labels_tensor = list_elem["labels"]
	
	scores_tensor = list_elem["scores"]

	#convert tensors to lists
	boxes = boxes_tensor.tolist()
	labels = labels_tensor.tolist()
	scores = scores_tensor.tolist()


	# get names of the labels
	label_names  = []
	for i in labels:
		label_name = label_categories[i]
		label_names.append(label_name)


	i = 0
	for b in boxes:
		row_values = []
		row_values.append(img_name)
		
		row_values.append(b[0])
		row_values.append(b[1])
		row_values.append(b[2])
		row_values.append(b[3])

		# append label
		row_values.append(labels[i])
		# append scores
		row_values.append(scores[i])

		write_file.writerow(row_values)
		i = i + 1
	
	


	show_boxes(img_path, boxes_tensor, label_names, scores) 




# function to predict on an uploaded image for the prototype; returs list of detected objects
def predict2 (model, img_name):


	trans = transforms.ToTensor()

	
	img_path = img_name

	img = Image.open(img_path).convert("RGB")
	img = trans(img)
	model.eval()
	
	predictions = model([img])
	

	list_elem = predictions[0]

	boxes_tensor = list_elem["boxes"]
	


	labels_tensor = list_elem["labels"]
	

	scores_tensor = list_elem["scores"]

	#convert tensors to lists
	boxes = boxes_tensor.tolist()
	labels = labels_tensor.tolist()
	scores = scores_tensor.tolist()


	# get names of the labels
	label_names  = []
	for i in labels:
		label_name = label_categories[i]
		label_names.append(label_name)

	

	return label_names;

	






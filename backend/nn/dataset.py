from __future__ import print_function, division
import os
import torch
import pandas as pd
from skimage import io, transform
import numpy as np
import matplotlib.pyplot as plt
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms, utils
from PIL import Image



class IndoorDataset(torch.utils.data.Dataset):
    
    #transforms war auch ein argument in init
    def __init__(self, csv_file, root):
        self.root = root
        self.transforms = transforms
        #os.path.join(root, "Images"))
        self.imgs = list(sorted(os.listdir(root)))
        self.box_data = pd.read_csv(csv_file)
        
        print("csv file is ", csv_file)
        print("box data is ", self.box_data)
        print("root is ", self.root)
        #print("images is ", self.imgs)
        
    def __getitem__(self, idx):
        
        # load images ad masks
        #"Images",
        img_path = os.path.join(self.root,  self.imgs[idx])
        
        #print("*** image path is *** ", img_path)
        img = Image.open(img_path).convert("RGB")
        
        trans = transforms.ToTensor()
        img = trans(img)
        #print("IMG is ", img)

        #print("#")
        
        #print("box data is #############", self.box_data)
        
        
        boxes_in_image = self.box_data[self.box_data.image == self.imgs[idx]]
        #print('boxes in image is \n', boxes_in_image)
        #, boxes_in_image.box_left[0]
        
            
        num_objs = len(boxes_in_image)
        #print("num objs is ", num_objs)
        indices = self.box_data.index[self.box_data.image == self.imgs[idx]].tolist()
        #print("indices is ", indices)
        
        #box_top  box_left  box_width  box_height
        # change according to needed input!
        boxes = []
        labels = []
        
        if boxes_in_image.empty:
            print("####### empty")
        
        if num_objs > 0:
            for i in range(num_objs):
                xmin = boxes_in_image.box_left[indices[i]]
                ymin = boxes_in_image.box_top[indices[i]]
                xmax = boxes_in_image.box_left[indices[i]] + boxes_in_image.box_width[indices[i]]
                ymax = boxes_in_image.box_top[indices[i]] + boxes_in_image.box_height[indices[i]]
                label = boxes_in_image.label[indices[i]]
                boxes.append([xmin, ymin, xmax, ymax])
                labels.append(label)
        else:
            boxes.append([0, 0, 0, 0])
            #labels.append()
            
        #print("boxes looks like this ", boxes)

        # convert everything into a torch.Tensor
        boxes = torch.as_tensor(boxes, dtype=torch.float32)
        labels = torch.as_tensor(labels, dtype=torch.int64)

        #print("LABELS IS ############################################################", labels)
        
        # change Labels !!!!!!!!!!!!!!!!!!!!!!!!1
        #labels = torch.ones((num_objs,), dtype=torch.int64)



        image_id = torch.tensor([idx])
        area = (boxes[:, 3] - boxes[:, 1]) * (boxes[:, 2] - boxes[:, 0])
        # suppose all instances are not crowd
        iscrowd = torch.zeros((num_objs,), dtype=torch.int64)

        target = {}
        target["boxes"] = boxes
        target["labels"] = labels
        target["image_id"] = image_id
        target["area"] = area
        target["iscrowd"] = iscrowd
    
        
        """
        if self.transforms is not None:
            print("############## img is ", img)
            print("############## target is ", target)
            #img, target = self.transforms(img, target)
        """
            

        return img, target

    def __len__(self):
        return len(self.imgs)

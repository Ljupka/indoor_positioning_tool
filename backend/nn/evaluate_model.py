import torch
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from engine import train_one_epoch, evaluate
from dataset import IndoorDataset
import utils



def get_instance_segmentation_model(num_classes):
    model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)

    # get the number of input features for the classifier
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    # replace the pre-trained head with a new one
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

    return model


#dataset_test = IndoorDataset('Indoor_Object_Detection_Dataset/annotations_file.csv', 'Indoor_Object_Detection_Dataset/Images/Test')
dataset = IndoorDataset('Indoor_Object_Detection_Dataset/annotations_file.csv', 'Indoor_Object_Detection_Dataset/Images/Train')


data_loader = torch.utils.data.DataLoader(
    dataset, batch_size=1, shuffle=False, num_workers=0, collate_fn=utils.collate_fn)

device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
print("Device is ", device)


print("before model Inst")
# get the model using our helper function
model = get_instance_segmentation_model(8)
model.load_state_dict(torch.load("result_model20200618-1216"))
model.to(device)


eval_model = evaluate(model, data_loader, device=device)
print("Epoch evaluation is ", eval_model)




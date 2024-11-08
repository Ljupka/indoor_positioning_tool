import torch
import torchvision
from dataset import IndoorDataset
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from engine import train_one_epoch, evaluate
import utils
from predictor import predict
import datetime




def get_instance_segmentation_model(num_classes):
    # load an instance segmentation model pre-trained on COCO
    #model = torchvision.models.detection.maskrcnn_resnet50_fpn(pretrained=True)
    model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)

    # get the number of input features for the classifier
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    # replace the pre-trained head with a new one
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

    # now get the number of input features for the mask classifier
    """
    in_features_mask = model.roi_heads.mask_predictor.conv5_mask.in_channels
    hidden_layer = 256
    # and replace the mask predictor with a new one
    model.roi_heads.mask_predictor = MaskRCNNPredictor(in_features_mask,
                                                       hidden_layer,
                                                       num_classes) """
    return model



# it was train = true
# it was get_transform(train=True)
dataset = IndoorDataset('Indoor_Object_Detection_Dataset/annotations_file.csv', 'Indoor_Object_Detection_Dataset/Images/Train')
dataset_test = IndoorDataset('Indoor_Object_Detection_Dataset/annotations_file.csv', 'Indoor_Object_Detection_Dataset/Images/Test')


# split the dataset in train and test set
"""
torch.manual_seed(1)
indices = torch.randperm(len(dataset)).tolist()


dataset = torch.utils.data.Subset(dataset, indices[:-737])
dataset_test = torch.utils.data.Subset(dataset_test, indices[-737:])



"""

data_loader = torch.utils.data.DataLoader(
    dataset, batch_size=1, shuffle=False, num_workers=0, collate_fn=utils.collate_fn)

data_loader_test = torch.utils.data.DataLoader(
    dataset_test, batch_size=1, shuffle=False, num_workers=0, collate_fn=utils.collate_fn)


"""
for t in enumerate(data_loader):
    
    print("img, target is ", t)
"""


device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

# our dataset has two classes only - background and person
num_classes = 8

print("before model Inst")
# get the model using our helper function
model = get_instance_segmentation_model(num_classes)
# move model to the right device
model.to(device)

print("after model inst")

# construct an optimizer
params = [p for p in model.parameters() if p.requires_grad]

print("after params")
optimizer = torch.optim.SGD(params, lr=0.0005,
                            momentum=0.9, weight_decay=0.0005)
print("after optimizer")

# and a learning rate scheduler which decreases the learning rate by
# 10x every 3 epochs
lr_scheduler = torch.optim.lr_scheduler.StepLR(optimizer,
                                               step_size=3,
                                               gamma=0.1)
print("after scheduler")
num_epochs = 50


for epoch in range(num_epochs):
    print("in epoch" + str(epoch))
    # train for one epoch, printing every 10 iterations
    train_one_epoch(model, optimizer, data_loader, device, epoch, print_freq=10)

    if epoch+1%10==0:
        torch.save(model.state_dict(), "result_model" + epoch)

    # update the learning rate
    lr_scheduler.step()
    # evaluate on the test dataset
    evaluate(model, data_loader_test, device=device)

t = datetime.datetime.now().strftime("%Y%m%d-%H%M")
torch.save(model.state_dict(), "result_model" + t)
print("Model saved!")


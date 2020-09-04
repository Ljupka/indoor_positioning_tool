import torchvision
import torch
import utils
from dataset import IndoorDataset


# for test
model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
dataset = IndoorDataset('Indoor_Object_Detection_Dataset/annotations_file.csv', 'Indoor_Object_Detection_Dataset/')
data_loader = torch.utils.data.DataLoader(
 dataset, batch_size=2, shuffle=True, num_workers=0,
 collate_fn=utils.collate_fn)
# For Training
images,targets = next(iter(data_loader))
images = list(image for image in images)
print("images is ", images)

targets = [{k: v for k, v in t.items()} for t in targets]
output = model(images,targets)   # Returns losses and detections
# For inference
model.eval()
x = [torch.rand(3, 300, 400), torch.rand(3, 500, 400)]

predictions = model(x)           # Returns predictions
print("predictions areee ", predictions )
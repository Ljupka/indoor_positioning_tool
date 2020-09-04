import xml.etree.ElementTree as ET
import os
import csv
import numpy as np



with open('annotations_file.csv', mode='w', newline='') as csv_file:


	fieldnames = ['image', 'box_top', 'box_left', 'box_width', 'box_height', 'label']
	writer = csv.writer(csv_file)
	writer.writerow(fieldnames)

	counter_fireextinguisher = 0
	counter_clock = 0
	counter_chair = 0
	counter_trashbin = 0
	counter_exit = 0
	counter_printer = 0
	counter_screen = 0


	for filename in  os.listdir("Annotations/"):
		tree = ET.parse("Annotations/" +  filename)
		root = tree.getroot()[2]

		for member in root.findall('image'):
			#print("found member ", member)

			img_file = member.attrib['file']

			"""
			if member.find('box') == None:
				print("NO CHILDREN  ", img_file)
			"""


			for child in member: 

				row_attribute_values = []
				row_attribute_values.append(img_file)
				#print ("child is ", child.tag, child.attrib)
				
				top = child.attrib['top']
				row_attribute_values.append(top)
				left = child.attrib['left']
				row_attribute_values.append(left)
				width = child.attrib['width']
				row_attribute_values.append(width)
				height = child.attrib['height']
				row_attribute_values.append(height)

				label_index = 0
				# order fireextinguisher, clock, chair, trashbin, exit, printer, screen
				for childs_child in child:
					label = childs_child.text	
					if label == 'screen':
						label_index = 1
						counter_screen = counter_screen + 1
					else:
						if label == 'clock':
							label_index = 2
							counter_clock = counter_clock + 1
						else:
							if label == 'chair':
								label_index = 3
								counter_chair = counter_chair + 1
							else:
								if label == 'trashbin':
									label_index = 4
									counter_trashbin = counter_trashbin + 1 
								else:
									if label == 'exit':
										label_index = 5
										counter_exit = counter_exit +1 
									else:
										if label == 'printer':
											label_index = 6
											counter_printer = counter_printer + 1
										else:
											if label == 'fireextinguisher':
												label_index = 7
												counter_fireextinguisher = counter_fireextinguisher + 1
												


				row_attribute_values.append(label_index)
				writer.writerow(row_attribute_values)
				
	print("row is ", row_attribute_values)
	print( "counter_fireextinguisher is ", counter_fireextinguisher)
	print( "counter_clock is ", counter_clock)
	print( "counter_chair is ", counter_chair)
	print( "counter_trashbin is ", counter_trashbin)
	print( "counter_exit is ", counter_exit)
	print( "counter_printer is ", counter_printer)
	print( "counter_screen is ", counter_screen)



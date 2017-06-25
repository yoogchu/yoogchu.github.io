import tinify
import os, os.path, glob
from yattag import Doc

tinify.key = "19UKhWk_BM2XBxQ1akPgWfrPB95fexFw"

DIR = "images/photography/"
EXT = ".jpg"

def countFiles():
	list_dir = []
	list_dir = os.listdir(DIR)
	count = 0
	for file in list_dir:
		if file.endswith(EXT): # eg: '.txt'
			count += 1
	return count

# print countFiles(DIR, ".jpg")

def checkRename():
	files = glob.glob(DIR + "*" + EXT)
	files.sort(key=os.path.getmtime)
	if countFiles() == int(files[len(files)-1][files[len(files)-1].rfind('/')+1: files[len(files)-1].rfind('.')])):
		return False
	else:
		return True
def compress():
	if not os.path.exists(DIR + 'thumbs/'):
		os.makedirs(DIR + 'thumbs/')

	for i in range (1, countFiles()+1):
		if os.path.isfile(DIR + "thumbs/" + str(i) + "_thumb" + EXT):
			# print 'skipping ' + str(i) + EXT
			continue
		print 'compressing ' + str(i) + EXT

		source = tinify.from_file(DIR + str(i) + EXT)
		resized = source.resize(
		    method="scale",
		    width=350
		)
		resized.to_file(DIR + "thumbs/" + str(i) + "_thumb" + EXT)

	print 'done'

def rename():
	numFiles = countFiles()

	files = glob.glob(DIR + "*" + EXT)
	files.sort(key=os.path.getmtime)

	i=1
	for image in files:
		os.rename(image, DIR + str(i) + EXT)
		i+=1

def createTags():
	numFiles = countFiles()
	doc, tag, text = Doc().tagtext()

	with tag('div', klass='container-images'):
		for i in xrange(numFiles,0,-1):
			doc.stag('img', src=DIR+'thumbs/'+str(i)+'_thumb'+EXT, onclick="clickImage(this)")
	
	return doc.getvalue()
def writeToHTML(filename):
	lines = open(filename, 'r')
	parts = lines.read().split('<!-- OVERWRITE -->')
	toInsert = createTags()
	toWrite = [parts[0], '<!-- OVERWRITE -->', toInsert, '<!-- OVERWRITE -->', parts[2]]
	overWrite = open(filename, 'w')
	overWrite.write(('').join(toWrite))
	overWrite.close()

def main():
	if checkRename:
		print 'Renaming ' + str(countFiles()) + ' files ...'
		rename()
		print 'Writing to HTML ...'
		writeToHTML('photography.html')
	print 'Compressing ...'
	compress()
	
if __name__ == '__main__':
	main()

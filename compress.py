import tinify
import os, os.path, glob, datetime
from yattag import Doc

tinify.key = "19UKhWk_BM2XBxQ1akPgWfrPB95fexFw"

DIR = "photos/"
DIR_THUMB = "photos/thumbs/"
EXT = ".jpg"
increment_num = 0

def countFiles(directory):
	list_dir = []
	if not os.path.exists(directory):
		os.makedirs(directory)

	list_dir = os.listdir(directory)
	count = 0
	for file in list_dir:
		if file.endswith(EXT): # eg: '.txt'
			count += 1
	return count

# print countFiles(DIR, ".jpg")

def checkRename():
	global increment_num

	files = glob.glob(DIR + "*" + EXT)
	files.sort(key=os.path.getctime)
	stop = False
	i = 1
	increment_num = len(files)
	erroredNum = 0

	while not stop:
		if erroredNum > 200:
			return 0
		try:
			str(int(files[len(files)-i][files[len(files)-i].rfind('/')+1: files[len(files)-i].rfind('.')]))
			stop = True
		except ValueError as e:
			i=i+1
		except IndexError as e:
			erroredNum+=1

	increment_num = increment_num - i + 1
	return countFiles(DIR) == int(files[len(files)-i][files[len(files)-i].rfind('/')+1: files[len(files)-i].rfind('.')])

def syncDIR():
	synced = False
	files = glob.glob(DIR_THUMB + "*" + EXT)
	files.sort(key=os.path.getmtime)
	for file in files:
		num = file[file.rfind('/')+1:file.rfind('_')]

		if not os.path.isfile(DIR + num + EXT):
			print 'removing ' + file
			os.remove(file)
			synced = True

	return synced

def compress():
	if not os.path.exists(DIR + 'thumbs/'):
		os.makedirs(DIR + 'thumbs/')

	maxRetryCount = 3

	for i in range (1, countFiles(DIR)+1):
		retryCount = 0

		if os.path.isfile(DIR + "thumbs/" + str(i) + "_thumb" + EXT):
			# print 'skipping ' + str(i) + EXT
			continue
		print 'compressing ' + str(i) + EXT + ' || ' + datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

		while retryCount < maxRetryCount:
			try:
				source = tinify.from_file(DIR + str(i) + EXT)
				resized = source.resize(
				    method="scale",
				    width=350
				)
				resized.to_file(DIR + "thumbs/" + str(i) + "_thumb" + EXT)
			except AttributeError as e:
				retryCount+=1
				print 'Caught ' + str(e) + '. Retrying.. (' + str(retryCount) + '/' + str(maxRetryCount) + ').'
				continue
			break

	print 'done'

def rename(directory):
	numFiles = countFiles(directory)

	files = glob.glob(directory + "*" + EXT)
	files.sort(key=os.path.getmtime)

	i=1
	for image in files:
		if directory == DIR_THUMB:
			os.rename(image, directory + str(i) + "_thumb" + EXT)
		else:
			os.rename(image, directory + str(i) + EXT)
		i+=1

def createTags():
	numFiles = countFiles(DIR)
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
#	print 'monthly compressions:' + str(tinify.compression_count)
	if syncDIR():
		print 'Renaming main dir ...'
		rename(DIR)
		print 'Renaming thumbs ...'
		rename(DIR_THUMB)

	checkRename()

	if increment_num < countFiles(DIR) or increment_num > countFiles(DIR_THUMB):
		print 'Renaming ' + str(countFiles(DIR)) + ' files ...'
		rename(DIR)
		print 'Compressing ...'
		compress()
	print 'Writing to HTML ...'
	writeToHTML('photography.html')
	
if __name__ == '__main__':
	main()

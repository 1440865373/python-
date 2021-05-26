import urllib.request
import re
from bs4 import BeautifulSoup
import requests
link = re.compile('<a href="(.*?)"',re.S)
imglink = re.compile('src="(.*?)"',re.S)

def main():
    baseurl="https://pic.netbian.com/"
    getdata(baseurl)


def getdata(baseurl):
    html=askurl(baseurl)
    # print(html)
    soup=BeautifulSoup(html,"html.parser")
    ul=soup.find_all("ul",class_="clearfix")
    #print(ul)
    newlist = []
    temp = 0
    for i in ul:
        hreflist = re.findall(link,str(i))
        #处理单个href
        # print(hreflist)
        for i in hreflist:
            imgweb="https://pic.netbian.com{}".format(i)
            # print(a)

            imghtml=askurl(imgweb)
            soup=BeautifulSoup(imghtml,"html.parser")
            imgdiv=soup.find_all("div",class_="photo-pic")
            imgg=re.findall(imglink,str(imgdiv))[0]
            imgg="https://pic.netbian.com{}".format(imgg)
           
            
            # 下载
            images = requests.get(imgg).content
            print(str(images)+ '.jpg 正在保存...')
            with open(r'data/images{}'.format(temp) + ".jpg", 'wb')as fp:
                fp.write(images)
            temp += 1	

        



def askurl(url):
	#模拟浏览器发送消息给服务器
	head = {
		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
	}
	request = urllib.request.Request(url = url,headers = head)
	html = ""
	try:
		response = urllib.request.urlopen(request)
		html = response.read().decode('gbk')
		# print(html)
	except urllib.error.URLError as e:
		# 网页报错代码捕获 418等等
		if hasattr(e,"code"):
			print(e.code)
		if hasattr(e,"reason"):
			print(e.reason)	
	return html	

if __name__=="__main__":
    main()

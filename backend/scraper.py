from bs4 import BeautifulSoup
from requests import get


def getAndParseURL(url):
  result = get(url)
  soup = BeautifulSoup(get(url).content, 'html.parser')
  wrappers = soup.find_all("div", class_ = "wpb_wrapper")

  for wrapper in wrappers:
    logo = wrapper.p[0].a.img["src"]
    discount = wrapper.p[1].text
    name = wrapper.p[2].a.b.text
    address = wrapper.p[3].text

    print("logo: ", logo)
    print("discount: ", discount)
    print("name: ", name)
    print("address: ", address)


getAndParseURL("https://sfbike.org/discounts/")
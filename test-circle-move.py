import sys
from PyQt4 import QtCore
from PyQt4 import QtGui
from PyQt4.QtWebKit import QGraphicsWebView

def getJsScript(filename):
    fileObject = open(filename,'r')
    jsValue = fileObject.read()
    fileObject.close
    return jsValue


class Scene(QtGui.QGraphicsScene):
    def __init__(self):
        super(QtGui.QGraphicsScene, self).__init__()
        self.view = QtGui.QGraphicsView(self)

        self.webview = QGraphicsWebView()
        self.webview.setFlags(QtGui.QGraphicsItem.ItemClipsToShape)
        self.webview.setCacheMode(QtGui.QGraphicsItem.NoCache)
        self.addItem(self.webview)

        self.webview.loadFinished.connect(self.svgLoaded)

    def svgLoaded(self):
        frame = self.webview.page().mainFrame()
        fsize = frame.contentsSize()
        self.webview.resize(QtCore.QSizeF(fsize))
        self.view.resize(fsize.width() + 10, fsize.height() + 10)
        self.webview.page().mainFrame().evaluateJavaScript(getJsScript('circle-test.js')) 
        

if __name__ == "__main__":
    app = QtGui.QApplication(sys.argv)
    v = Scene()
    svg = QtCore.QUrl("circle-test.svg")
    v.webview.load(svg)
    v.view.show()
    sys.exit(app.exec_())

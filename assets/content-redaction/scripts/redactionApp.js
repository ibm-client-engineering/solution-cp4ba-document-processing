const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs/promises');

async function addBlockToPDF(pdfPath, outputPath, inputDetails) {
  // Read the existing PDF file
  const pdfBytes = await fs.readFile(pdfPath);
    console.log("PDF Bytes");
   // console.log(pdfBytes);
  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);
  console.log("PDF Doc")
  // Get the first page of the PDF document
  const [page] = pdfDoc.getPages();
  console.log("PDF Page")
  var widthOfPage= page.getWidth();
  var heightOfPage = page.getHeight();
  console.log(widthOfPage+','+heightOfPage);
  //console.log(page);
  // Create a red rectangle as an example
  var { x, y, width, height,ibmWidthMax,ibmHeightMax } = inputDetails;
    xFactor = widthOfPage/ibmWidthMax;
    yFactor = heightOfPage/ibmHeightMax;
   
    x = x*xFactor;
    width = width*xFactor + 2;
    height = height*yFactor + 2;
    y= y*yFactor;
    y = heightOfPage-(y+height);


  const blackColor = rgb(0, 0, 0);
  page.drawRectangle({ x, y, width, height, color: blackColor });
  
  console.log("PDF Page with red box")

  // Save the modified PDF to a new file
  const modifiedPdfBytes = await pdfDoc.save();
  console.log("PDF Modified Bytes")
  await fs.writeFile(outputPath, modifiedPdfBytes);
  console.log("PDF Written")
}

    //FileFullName
    //X
    //Y
    //width
    //height
    //page
    //ibmPageWidth
    //ibmPageHeight

var arg = process.argv;
    console.log(arg);
// Example usage
const pdfPath = arg[2];
const outputPath = arg[2];
//1082,194,18,117
var inputDetails = { x: arg[3], y: arg[4], width: arg[5], height: arg[6], page:arg[7], ibmWidthMax :arg[8], ibmHeightMax : arg[9] }; // Replace with your coordinates
console.log(inputDetails);

addBlockToPDF(pdfPath, outputPath, inputDetails);

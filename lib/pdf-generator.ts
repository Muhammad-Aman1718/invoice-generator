"use client";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// export async function generateInvoicePDF(elementId: string): Promise<void> {
//   const element = document.getElementById(elementId);
//   if (!element) throw new Error("Invoice preview element not found");

//   const canvas = await html2canvas(element, {
//     scale: 2,
//     useCORS: true,
//     logging: false,
//     backgroundColor: "#ffffff",
//   });

//   const imgData = canvas.toDataURL("image/png", 1.0);
//   const imgWidth = 210;
//   const imgHeight = (canvas.height * imgWidth) / canvas.width;

//   const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//   const pageHeight = 297;
//   let heightLeft = imgHeight;
//   let position = 0;

//   pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//   heightLeft -= pageHeight;

//   while (heightLeft > 0) {
//     position = heightLeft - imgHeight;
//     pdf.addPage();
//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;
//   }

//   pdf.save(`invoice-${Date.now()}.pdf`);
// }




export async function generateInvoicePDF(elementId: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Invoice preview element not found");

  // Temporary styling taake PDF ka layout fix ho jaye
  const originalStyle = element.style.width;
  element.style.width = "800px"; // A4 ke liye ideal width for canvas

  try {
    const canvas = await html2canvas(element, {
      scale: 3, // High quality ke liye scale 3 karein
      useCORS: true,
      allowTaint: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");
    
    const imgWidth = 210; // A4 Width in mm
    const pageHeight = 297; // A4 Height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Pehla page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Agar invoice lambi hai toh mazeed pages
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`invoice-${Date.now()}.pdf`);
  } finally {
    // Layout wapas waisa hi kar dein jaisa screen par tha
    element.style.width = originalStyle;
  }
}
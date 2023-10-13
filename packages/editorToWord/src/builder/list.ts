import { Paragraph } from 'docx';

// Define a type for the nodes we are expecting
interface ListNode {
  type: string;
  children: Array<{ content: string }>;
}

export function buildList(node: ListNode): Paragraph[] {
  let docxElements: Paragraph[] = [];

  // Check the type of list: ordered (ol) or unordered (ul)
  if (node.type === 'ol') {
    // Logic to handle ordered lists and convert to DOCX elements

    // For each <li> child of the <ol> node
    let index = 0;
    for (let liNode of node.children) {
      let para = new Paragraph({
        text: liNode.content,
        numbering: {
          reference: 'my-crazy-numbering', // Assuming this is the reference for your ordered list
          level: index,
        }, // Using 0 as an example level
      });
      index++;
      docxElements.push(para);
    }
  } else if (node.type === 'ul') {
    // Logic to handle unordered lists and convert to DOCX elements

    // For each <li> child of the <ul> node
    for (let liNode of node.children) {
      let para = new Paragraph({
        text: liNode.content,
        bullet: {
          level: 0,
        },
      });
      docxElements.push(para);
    }
  }

  return docxElements;
}

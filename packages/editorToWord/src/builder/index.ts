import { Paragraph, ParagraphChild } from 'docx';
import { D_TagStyleMap, TagType } from '../default';
import { CustomTagStyleMap, Node } from '../types';
import { isFilledArray } from '../utils';
import { tableCreator } from './table';
import { calcTextRunStyle, getChildrenByTextRun } from './text';

export const contentBuilder = async (
  node: Node,
  tagStyleMap: CustomTagStyleMap = D_TagStyleMap
) => {
  const { type, name, children, content, shape } = node;

  const para: { text: string; children: ParagraphChild[] } = {
    text: content,
    children: [],
  };

  const isText = type === TagType.text && content;
  const isLink = name === TagType.link;
  const isTable = name === TagType.table;
  const isList = name === TagType.ordered_list || name === TagType.unordered_list;

  const isNormalParagraphWithChildren =
    !isLink &&
    !isTable &&
    !isList &&
    children &&
    isFilledArray(children) &&
    children.length > 0;

  if (isText) {
    const paragraphOption = {
      ...para,
      ...calcTextRunStyle(shape, tagStyleMap),
    };
    return new Paragraph(paragraphOption);
  } else if (isNormalParagraphWithChildren) {
    para.children = await getChildrenByTextRun(children, tagStyleMap);
    const paragraphOption = {
      ...para,
      ...calcTextRunStyle(shape, tagStyleMap),
    };
    return new Paragraph(paragraphOption);
  } else if (isTable) {
    const table = await tableCreator(node, tagStyleMap);
    return table;
  } else if(isList) {
    return null;
  }
  else {
    return null;
  }
};

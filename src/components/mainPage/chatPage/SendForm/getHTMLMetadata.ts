import { MetadataType } from '../../../../types';
import './Metadata.css';

const extractFirstLink = (htmlString: string): string | null => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const links = doc.getElementsByTagName('a');

  if (links.length > 0) {
    return links[0].href;
  } else {
    return null;
  }
};

export const getHTMLMetadata = async (
  htmlString: string,
  getMetadata: (url: string) => Promise<void | MetadataType>,
) => {
  const firstLink = extractFirstLink(htmlString);
  if (firstLink) {
    const data = await getMetadata(firstLink);

    if (data) {
      return `<div class="metadata"><span class="metadata-title"><a href="${firstLink}">${data.title}</a></span><span class="metadata-description">${data?.description ?? ''}</span>
          ${data?.imageUrl && !data.imageUrl.includes('static')
    ? `<img style="height: 200px;width: 200px" alt="${data.title}" src="${data?.imageUrl}">`
    : ''}
        </div>
      `;
    }
  }

  return '';
};

import React from 'react';
import { Image } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import iconv from 'iconv-lite';

import { awsUrlContentTypeGroupRegexp, awsUrlFileNameGroupRegexp } from '../../../../../constants';
import galleryStyles from '../ImageGallery.module.scss';

interface MessageAttachments {
  images: React.JSX.Element[];
  files: React.JSX.Element[];
}

const getContentType = (presignedUrl: string): string => {
  const contentTypeGroups = decodeURIComponent(presignedUrl).match(awsUrlContentTypeGroupRegexp);
  if (!contentTypeGroups) return '';

  return contentTypeGroups[1];
};

const getFileName = (presignedUrl: string): string => {
  const fileNameGroups = presignedUrl.match(awsUrlFileNameGroupRegexp);
  if (!fileNameGroups) return '';

  const encoded = iconv.encode(decodeURI(fileNameGroups[1]), 'binary');
  const decoded = iconv.decode(encoded, 'utf8');

  return decodeURI(decoded) + fileNameGroups[2];
};

export const fileUrlsToAttachments = (fileUrls: string[] | undefined): MessageAttachments => {
  const attachments: MessageAttachments = {
    images: [],
    files: [],
  };

  fileUrls?.forEach((fileUrl) => {
    if (getContentType(fileUrl).startsWith('image')) {
      const imageNumber = attachments.images.length + 1;
      attachments.images.push(
        <Image
          key={imageNumber}
          src={fileUrl}
          wrapperClassName={galleryStyles['gallery-element']}
          wrapperStyle={{ gridArea: `el-${imageNumber}` }}
        />,
      );
    } else {
      attachments.files.push(
        <div key={fileUrl}>
          <a href={fileUrl}>
            <PaperClipOutlined />
            {' '}
            {getFileName(fileUrl)}
          </a>
        </div>,
      );
    }
  });

  return attachments;
};

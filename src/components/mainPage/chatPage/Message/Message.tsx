import React, {useState} from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {observer} from 'mobx-react-lite';
import iconv from 'iconv-lite'
import {Image} from 'antd'

import {MessageType} from '../../../../types'
import {authUserStore} from '../../../../stores';
import {Avatar} from '../../../Avatar';

import styles from './Message.module.scss';
import galleryStyles from './ImageGallery.module.scss';

import Reactions from './reactions/Reactions';
import ReactionButton from './reactions/ReactionButton';
import {awsUrlContentTypeGroupRegexp, awsUrlFileNameGroupRegexp} from "../../../../constants";
import {PaperClipOutlined} from "@ant-design/icons";

type Props = {
  message: MessageType;
  isGroup: boolean;
}

const Message: React.FC<Props> = ({ message, isGroup }) => {
  const { selectedItem } = authUserStore;
  const [ isHover, setIsHover ] = useState(false);

  const isActivePerson = selectedItem?.id === message.userId;
  const attachments = fileUrlsToAttachments(message.fileUrls)

  return (

    <>
      <div
        className={clsx(
          styles['message-bar'],
          isActivePerson ? styles['my-message'] : styles['partner-message'])}
      >
        {isGroup && !isActivePerson && <Avatar className={styles['user-avatar-in-group']} userId={message.userId} size={25} />}
        <div className={styles['message']}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div dangerouslySetInnerHTML={{ __html: message.text }} />
          { attachments.images.length > 0 &&
            <div className={galleryStyles['image-gallery-grid'] + ' ' + galleryStyles[`elements-${attachments.images.length}`]}>
              <Image.PreviewGroup>
                { attachments.images }
              </Image.PreviewGroup>
            </div>
          }
          { attachments.files.length > 0 && <>
              <hr className={styles['attachments-separate-line']} />
              <div>
                { attachments.files }
              </div>
          </> }
          <Reactions message={message}/>
          <div className={styles['message-meta']}>
            <span className={styles['timestep']}>
              {moment(message.inTime ?? message.createdAt).format('LT')}
            </span>
          </div>
          <ReactionButton message={message} setVisible={isHover}/>
        </div>
      </div>

    </>
  );

  function fileUrlsToAttachments(fileUrls: string[] | undefined): MessageAttachments {
    const attachments: MessageAttachments = {
      images: [],
      files: []
    }

    fileUrls?.forEach((fileUrl, idx) => {
      if (getContentType(fileUrl).startsWith('image')) {
        const imageNumber = attachments.images.length + 1;
        attachments.images.push(
          <Image key={imageNumber} src={fileUrl}
                 wrapperClassName={galleryStyles['gallery-element']} wrapperStyle={{gridArea: `el-${imageNumber}`}} />
        );
      } else {
        attachments.files.push(
          <div key={idx}>
            <a href={fileUrl}><PaperClipOutlined /> {getFileName(fileUrl)}</a>
          </div>
        );
      }
    });

    return attachments;

    function getContentType(presignedUrl: string): string {
      const contentTypeGroups = decodeURIComponent(presignedUrl).match(awsUrlContentTypeGroupRegexp);
      if (!contentTypeGroups) return '';

      return contentTypeGroups[1];
    }

    function getFileName(presignedUrl: string): string {
      const fileNameGroups = presignedUrl.match(awsUrlFileNameGroupRegexp);
      if (!fileNameGroups) return '';

      const encoded = iconv.encode(decodeURI(fileNameGroups[1]), 'binary');
      const decoded = iconv.decode(encoded, 'utf8');

      return decodeURI(decoded) + fileNameGroups[2];
    }
  }
};

interface MessageAttachments {
  images: React.JSX.Element[]
  files: React.JSX.Element[]
}

export default observer(Message);

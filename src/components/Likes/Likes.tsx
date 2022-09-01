import React from 'react';

import LikeIcon from '@components/LikeIcon';
import classNames from 'classnames';

import styles from './Likes.module.scss';

type LikesProps = {
  likes: number;
  className: string;
};

const Likes: React.FC<LikesProps> = ({ likes, className }) => {
  const likesClassname = classNames(styles.likes, { [`${className}`]: className });
  return (
    <div className={likesClassname}>
      <LikeIcon />
      <div>{likes} Likes</div>
    </div>
  );
};

export default Likes;

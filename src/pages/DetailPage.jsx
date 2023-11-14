import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import {
  AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike,
} from 'react-icons/ai';
import {
  asyncCreateComment,
  asyncDislikeDetailThread,
  asyncGetDetailThread,
  asyncLikeDetailThread,
  asyncNeutralizeDownVoteDetail,
  asyncNeutralizeUpVoteDetail,
} from '../states/threadDetail/action';
import { postedAt } from '../utils';
import useInput from '../hooks/useInput';
import CommentsList from '../components/CommentsList';
import Loading from '../components/Loading';
import Button from '../components/Button';

function DetailPage() {
  const { detailThread = null, authUser } = useSelector((states) => states);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, handleCommentChange, setComment] = useInput('');

  useEffect(() => {
    dispatch(asyncGetDetailThread(id));
  }, [dispatch, id]);

  if (!detailThread) {
    return null;
  }

  const {
    title, body, upVotesBy, downVotesBy, owner, category, createdAt, comments,
  } = detailThread;
  const isThreadLiked = upVotesBy.includes(authUser.id);
  const isThreadDisliked = downVotesBy.includes(authUser.id);

  const handleInputComment = (e) => {
    handleCommentChange(e);
  };

  const onSumbit = async () => {
    dispatch(asyncCreateComment(id, comment));
    setComment('');
  };

  const handleLike = () => {
    dispatch(asyncLikeDetailThread(id));
  };

  const handleDislike = () => {
    dispatch(asyncDislikeDetailThread(id));
  };

  const handleNeutralizeLike = () => {
    dispatch(asyncNeutralizeUpVoteDetail(id));
  };

  const handleNeutralizeDislike = () => {
    dispatch(asyncNeutralizeDownVoteDetail(id));
  };

  const commentsList = comments.map((item) => ({
    ...item,
    authUser: authUser.id,
    threadId: id,
  }));

  return (
    <>
      <Loading />
      <div className="mb-4">
        <div className="talk-item__category mb-2">{category}</div>
        <div>
          <h1 className="mb-2">{title}</h1>
          <div className="talk-item__text">
            <div className="html-container h5">{parse(body)}</div>
          </div>
        </div>
        <div className="d-flex gap-3 mt-2 thread-detail__info">
          <div type="submit" className="talk-item__button d-flex align-items-center">
            {isThreadLiked
              ? <AiFillLike size={20} onClick={handleNeutralizeLike} />
              : <AiOutlineLike size={20} onClick={handleLike} />}
            <p>{upVotesBy.length}</p>
          </div>
          <div type="submit" className="talk-item__button d-flex align-items-center">
            {isThreadDisliked
              ? <AiFillDislike size={20} onClick={handleNeutralizeDislike} />
              : <AiOutlineDislike size={20} onClick={handleDislike} />}
            <p>{downVotesBy.length}</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <p>Dibuat Oleh</p>
            <div className="talk-item__user-photo">
              <img src={owner.avatar} alt={owner.name} width={24} height={24} />
            </div>
            <p>{owner.name}</p>
            <p className="talk-item__created-at">{postedAt(createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h5 className="fw-bold mb-2">Beri Komentar</h5>
        <textarea className="add-thread__input w-100 mb-2" value={comment} onChange={handleInputComment} required />
        <Button text="Kirim" type="primary" onClick={onSumbit} />
      </div>
      <div className="mb-4">
        <h5 className="fw-bold mb-2">
          Komentar (
          {comments.length}
          )
        </h5>
        <CommentsList comments={commentsList} />
      </div>
    </>
  );
}

export default DetailPage;

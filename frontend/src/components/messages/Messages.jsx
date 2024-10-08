import useGetMessages from '../../hooks/useGetMessages';
import useListenMessages from '../../hooks/useListenMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import Message from './Message';
import {useRef, useEffect} from 'react';

const Messages = () => {
  const {messages, loading} = useGetMessages();
  console.log(messages);
  const lastMessageRef = useRef();

  //custom hook for listening for incoming message in real time
  useListenMessages();

  //scrolling to the newest message
  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
      {loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}

    </div>
  )
}

export default Messages
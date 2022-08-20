import React from 'react';
import Pagination from '../pagination/Pagination';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({
  items,
  isLoading,
  search,
  onSearch,
  invitation,
  onSendInvitation,


}) => {


  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input type="text" placeholder="Найти пользователя..."
          value={search}
          onChange={onSearch}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          {
            [...new Array(5)].map((_, i) => <Skeleton key={i} />)
          }

        </div>
      ) : (
        <>
          <ul className="users-list">
            {
              items.filter(obj => {
                const fullName = (obj.last_name + obj.first_name).toLowerCase();
                return fullName.includes(search.toLowerCase) || obj.email.toLowerCase().includes(search.toLowerCase());
              }).map((obj) =>
                <User {...obj}
                  invitation={invitation.includes(obj.id)}

                />
              )
              
         
            }

          </ul>
          <Pagination/>
        </>
      )}
      {
        invitation.length > 0 &&
        <button className="send-invite-btn" onClick={onSendInvitation}>Отправить приглашение</button>


      }

    </>
  );
};

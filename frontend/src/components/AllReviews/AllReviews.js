import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../store/reviews';

function AllReviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <p>{review.content}</p>
          <p>{review.rating}</p>

        </div>
      ))}
    </div>
  );
}

export default AllReviews;

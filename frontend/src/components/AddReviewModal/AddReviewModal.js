import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import ReviewRatingInput from '../ReviewRatingInput';

function AddReviewModal({review, onSubmit, closeForm, formType}) {
    const dispatch = useDispatch();
    const [reviewBody, setReviewBody] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        await dispatch(onSubmit({...review, stars}));
        closeForm();

    };
}

export default AddReviewModal;

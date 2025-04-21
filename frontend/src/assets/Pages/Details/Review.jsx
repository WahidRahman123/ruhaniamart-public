import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Rating,
  Link,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContextProvider";
import axios from "axios";
import { toast } from "sonner";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Review({
  product,
  triggerUseEffect,
  setTriggerUseEffect,
}) {
  const [review, setReview] = useState({
    rating: 5,
    body: "",
  });
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to review.");
    if (!review.body) return alert("Empty Review!");

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/products/${
          product._id
        }/reviews`,
        review,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      toast.success("Product added successfully!", {
        style: { backgroundColor: "#1bb33e", color: "#FFFFFF", border: "none" },
      });
      setReview({
        rating: 5,
        body: "",
      });
      setTriggerUseEffect(!triggerUseEffect);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    // setReviews([...reviews, newReview]);
    // setNewReview({ name: "", rating: 5, comment: "" });
  };

  const handleDeleteReview = async (productId, reviewId) => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/api/products/${productId}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      toast.success("Review Deleted!")
      setTriggerUseEffect(!triggerUseEffect);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 pb-6 px-4 md:flex gap-10 mt-3 border-1">
      <div className="space-y-4 mt-5 md:w-[100vw]">
        <Typography variant="h6" gutterBottom className="p-5 ">
          Best Reviews
        </Typography>
        <div
          className={`${
            product.reviews.length > 0 ? "" : "hidden"
          } h-[300px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-slate-400`}
        >
          {product.reviews.length > 0 &&
            product.reviews.map((review, index) => (
              <Card key={index} className="mb-4 md:w-[50vw]">
                <div className="bg-bg">
                  <CardHeader title={review.user.name} />
                  <CardContent className="flex justify-between">
                    <div>
                      <Rating value={review.rating} readOnly />
                      <Typography variant="body1" className="mt-2">
                        {review.body}
                      </Typography>
                    </div>
                    {user && user._id === review.user._id && (
                      
                      <IconButton
                        disabled={loading}
                        aria-label="delete"
                        onClick={() =>
                          handleDeleteReview(product._id, review._id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
        </div>

        {product.reviews.length <= 0 && (
          <div className="flex items-center text-2xl font-bold justify-center text-gray-700 bg-[#85c7c6] md:ml-5 min-h-[320px] rounded">
            No Reviews Yet.
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 p-4 border rounded-lg shadow flex flex-col max-h-[380px] gap-5 w-full"
      >
        <Typography variant="h6" gutterBottom>
          Leave a Review
        </Typography>
        <Rating
          value={review.rating}
          onChange={(_, newValue) => setReview({ ...review, rating: newValue })}
          className="mb-2"
        />

        <TextField
          fullWidth
          label="Your Review"
          variant="outlined"
          multiline
          rows={3}
          value={review.body}
          onChange={(e) => setReview({ ...review, body: e.target.value })}
          className="mb-2"
        />

        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
}

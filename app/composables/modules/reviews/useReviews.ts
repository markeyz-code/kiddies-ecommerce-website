import { ref } from 'vue'
import { useCustomToast } from '../../core/useCustomToast'
import { reviewsApi } from '@/api_factory/modules/reviews'

export const useReviews = () => {
  const loading = ref(false)
  const reviews = ref([])
  const { showToast } = useCustomToast()

  const fetchReviews = async (productId: string) => {
    loading.value = true
    try {
      const response = await reviewsApi.getReviewsByProductId(productId)
      reviews.value = response.data || []
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      loading.value = false
    }
  }

  const submitReview = async (productId: string, rating: number, comment: string) => {
    loading.value = true
    try {
      const response = await reviewsApi.submitReview({ productId, rating, comment })
      reviews.value.unshift(response.data)
      showToast({
        title: 'Review Submitted',
        message: 'Thank you for your feedback!',
        toastType: 'success'
      })
      return true
    } catch (error) {
      showToast({
        title: 'Failed to submit review',
        message: error?.response?.data?.message || 'An error occurred. Please try again.',
        toastType: 'error'
      })
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    reviews,
    fetchReviews,
    submitReview
  }
}

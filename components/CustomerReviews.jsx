import {motion} from 'framer-motion'
import { Star } from 'lucide-react'
const CustomerReviews = () => {
  return (
    <>
      {/* Reviews Section */}
      <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Don&apos;t just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "Amazing food and excellent service! The atmosphere is perfect for a romantic dinner.",
                date: "2 days ago"
              },
              {
                name: "Mike Chen",
                rating: 5,
                comment: "Best restaurant in town! The chef's special is absolutely delicious and the staff is very friendly.",
                date: "1 week ago"
              },
              {
                name: "Emily Davis",
                rating: 5,
                comment: "Fresh ingredients and excellent presentation. Highly recommended for special occasions!",
                date: "2 weeks ago"
              }
            ].map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg border"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">&quot;{review.comment}&quot;</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
    </>
  )
}

export default CustomerReviews

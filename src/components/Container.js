export const Container = ({ children, ...props }) => (
  <div className="py-6 sm:py-8" {...props}>
    {children}
  </div>
)

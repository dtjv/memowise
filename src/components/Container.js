export const Container = ({ children, ...props }) => (
  <div className="py-8 sm:py-10" {...props}>
    {children}
  </div>
)

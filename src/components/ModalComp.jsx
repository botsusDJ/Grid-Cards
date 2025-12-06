export const ModalComp = ({ title, containerClassName = "", children, onClose, }) =>  {
  const containerClass = `modal-content ${containerClassName}`;

  return (
    <div className="modal">
      <div className={containerClass} onCanPlay={(e) => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );   
}
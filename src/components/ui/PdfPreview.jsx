import { FaFilePdf } from 'react-icons/fa';

const PdfPreview = ({ imageUrl, onClick, className = "" }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Preview Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Overlay with PDF Icon and Text */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300 rounded-lg flex flex-col items-center justify-center">
        <FaFilePdf className="text-white text-5xl mb-4" />
        <span className="text-white text-lg font-medium">Klik om de PDF te bekijken</span>
      </div>
    </div>
  );
};

export default PdfPreview;
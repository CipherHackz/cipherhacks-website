import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';

// Configure PDF.js worker - use local copy to avoid build issues
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

// Custom CSS for PDF styling
const pdfStyles = `
  .pdf-container .react-pdf__Page {
    background: transparent !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
  }
  
  .pdf-container .react-pdf__Page__canvas {
    max-width: 100% !important;
    height: auto !important;
  }
  
  .pdf-container .react-pdf__Document {
    display: flex !important;
    justify-content: center !important;
  }
`;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

const schedules = [
  { name: 'Day 1', path: '/ScheduleDay1.pdf' },
  { name: 'Day 2', path: '/ScheduleDay2.pdf' },
];

interface PdfViewerProps {
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ onClose }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState(schedules[0].path);
  const [isLoading, setIsLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number | undefined>();
  const [containerHeight, setContainerHeight] = useState<number | undefined>();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = () => {
    setPageNumber(1);
    setIsLoading(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      const newScrollX = scrollPosition.x - deltaX;
      const newScrollY = scrollPosition.y - deltaY;
      
      containerRef.current.scrollLeft = newScrollX;
      containerRef.current.scrollTop = newScrollY;
      
      setScrollPosition({ x: newScrollX, y: newScrollY });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

    
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const element = containerRef.current;
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
        setContainerHeight(entry.contentRect.height);
      }
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      <style>{pdfStyles}</style>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-atom-bg rounded-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-atom-blue overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-atom-bg-alt border-b border-atom-blue border-opacity-20 flex-shrink-0">
                    <div></div>
                    
                    {/* Centered Day Buttons */}
                    <div className="flex items-center gap-4">
                        {schedules.map(schedule => (
                            <button 
                                key={schedule.name}
                                onClick={() => {
                                    setSelectedSchedule(schedule.path);
                                    setIsLoading(true);
                                    setZoomLevel(1);
                                    setScrollPosition({ x: 0, y: 0 });
                                }}
                                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                                    selectedSchedule === schedule.path 
                                    ? 'bg-atom-blue text-white'
                                    : 'bg-transparent text-atom-fg-muted hover:bg-atom-blue hover:bg-opacity-20'
                                }`}
                            >
                                {schedule.name}
                            </button>
                        ))}
                    </div>
                    
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        aria-label="Close PDF Viewer"
                        className="text-atom-fg hover:text-atom-red transition-colors p-1 rounded-full hover:bg-atom-red hover:bg-opacity-20"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* PDF Content */}
                <div 
                    ref={containerRef} 
                    className={`flex-grow relative flex items-center justify-center ${
                        zoomLevel > 1 ? 'overflow-auto cursor-grab' : 'overflow-hidden'
                    } ${isDragging ? 'cursor-grabbing' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {isLoading && (
                        <div className="text-atom-green text-lg">Loading PDF...</div>
                    )}
                    <div style={{ display: isLoading ? 'none' : 'block' }} className="pdf-container">
                        <Document
                            file={selectedSchedule}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={(error: Error) => {
                                console.error('Error loading document:', error);
                                setIsLoading(false);
                            }}
                            loading={<div className="text-atom-green text-lg">Loading PDF...</div>}
                        >
                            <Page 
                                pageNumber={pageNumber} 
                                renderTextLayer={false} 
                                renderAnnotationLayer={false}
                                width={containerWidth && containerHeight ? 
                                    Math.min(
                                        containerWidth * 0.9 * zoomLevel, // Apply zoom to width
                                        containerHeight * 0.9 * (8.5/11) * zoomLevel // Apply zoom to height
                                    ) : undefined
                                }
                                devicePixelRatio={window.devicePixelRatio || 1}
                            />
                        </Document>
                    </div>
                </div>

                {/* Zoom Controls - Fixed Bottom Left */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-atom-bg-alt bg-opacity-90 backdrop-blur-sm rounded-lg p-2 border border-atom-blue border-opacity-20">
                    <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.5}
                        className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-atom-blue hover:bg-opacity-20 text-atom-fg"
                        title="Zoom Out"
                    >
                        <MagnifyingGlassMinusIcon className="h-4 w-4" />
                    </button>
                    <span className="text-atom-fg-muted text-xs min-w-[2.5rem] text-center">
                        {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                        className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-atom-blue hover:bg-opacity-20 text-atom-fg"
                        title="Zoom In"
                    >
                        <MagnifyingGlassPlusIcon className="h-4 w-4" />
                    </button>
                </div>

            </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};

export default PdfViewer;

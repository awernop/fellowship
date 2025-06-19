import React, { useState, useEffect } from 'react';

const SocialShareButton = () => {
  const [pageUrl, setPageUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
    setPageTitle(document.title);
  }, []);

  const shareText = `Посмотри эту клаcсную идею в Вместе! 🌟  ${pageUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pageTitle,
          text: shareText,
          url: pageUrl,
        });
      } catch (err) {
        console.log('Отмена шаринга:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="">
      {/* Native Share */}
        <button
          onClick={nativeShare}
          className="flex items-center gap-2 justify-center w-[50%] py-2 bg-white border rounded-md font-semibold text-[14px] mt-2 text-night shadow-[1px_1px_10px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)] hover:bg-gray-50 focus:bg-gray-50 transition ease-in-out duration-350"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Поделиться
        </button>

        {/* Copy */}
        <button
          onClick={copyToClipboard}
          className={`flex items-center text-[14px] font-medium gap-2 mt-4 rounded-md transition-colors opacity-60 ${
            isCopied 
              ? 'text-gray-500' 
              : 'text-night'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          {isCopied ? 'Скопировано!' : 'Копировать ссылку'}
        </button>
    </div>
  );
};

export default SocialShareButton;
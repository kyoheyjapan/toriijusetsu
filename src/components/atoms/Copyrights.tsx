import React from 'react';
import siteConfig from '../../site.config.json';

interface Props {
  className?: string;
  [key: string]: any;
}

const Copyrights: React.FC<Props> = ({ className = '', ...props }) => {
  const currentYear = new Date().getFullYear();
  const companyNameEng = siteConfig.siteInfo.company.nameEng;

  return (
    <h6
      className={`
        text-box-en type-xs font-sans font-normal tracking-wide text-gray-500
        ${className}
      `}
      {...props}
    >
      <small>
        &copy&thinsp;{companyNameEng}&thinsp;{currentYear}
        All&nbsp;Rights&nbsp;Reserved.
      </small>
    </h6>
  );
};

export default Copyrights;

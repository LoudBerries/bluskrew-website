import { socialFooterRow, socialFooterStyles } from '../../shared/social-footer.mjs';

export default function SocialFooter() {
  return (
    <>
      <style>{socialFooterStyles}</style>
      <footer className="bk-social-footer" dangerouslySetInnerHTML={{ __html: socialFooterRow }} />
    </>
  );
}

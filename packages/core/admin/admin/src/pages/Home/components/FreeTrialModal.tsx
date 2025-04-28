import { Button, Modal, Typography } from '@strapi/design-system';

//import darkIllustration from '../../../assets/images/free-trial.png';
import lightIllustration from '../../../assets/images/free-trial.svg';
// import { useTypedSelector } from '../../../core/store/hooks';

// const currentTheme = useTypedSelector((state) => state.admin_app.theme.currentTheme);
// const illustration = currentTheme === 'light' ? lightIllustration : darkIllustration;

// interface DocumentStatusProps {
//     status: RecentDocument['status'];
//   }

// //const FreeTrialModal = ({ status = 'draft' }: DocumentStatusProps) => {
export const FreeTrialModal = () => {
  return (
    <Modal.Root defaultOpen={true}>
      <Modal.Content>
        <Modal.Header padding={0} paddingInlineEnd={0} paddingInlineStart={0}>
          <Modal.Title>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={lightIllustration}
                alt="free-trial-illustration"
                width="100%"
                height="100%"
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography
            variant="alpha"
            fontWeight="bold"
            textColor="neutral1000"
            textAlign="left"
            fontSize={4}
          >
            We're glad to have you on board
          </Typography>
          <br />
          <Typography variant="delta" textColor="neutral1000" textAlign="left" fontSize={2}>
            For the next 30 days, you will have full access to advanced features like Content
            History, Releases and Single Sign-On (SSO) – everything you need to explore the power of
            Strapi CMS. Use this time to build, customize, and test your content workflows with
            complete flexibility!
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button>Start exploring</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

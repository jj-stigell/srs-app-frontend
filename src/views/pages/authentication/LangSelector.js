import { Button } from '@material-ui/core';
import { lngs } from '../../utilities/lngs';
import { useTranslation } from 'react-i18next';

const LangSelector = () => {
  const { i18n } = useTranslation();

  const setLang = ({ language }) => {
    i18n.changeLanguage(language);
  };

  return(
    <div>
      {Object.keys(lngs).map((lng) => (
        <Button
          key={lng}
          size="small"
          onClick={() => setLang(lng)}
          type="submit"
          variant="contained"
          color={i18n.resolvedLanguage === lng ? 'success' : 'primary'}
        >
          {lngs[lng].nativeName}
        </Button>
      ))}
    </div>
  );
};

export default LangSelector;

import { useTranslation } from "react-i18next";
import OptionCheckbox from "./components/OptionCheckbox/OptionCheckbox";
import LanguageToggle from "./components/LanguageToggle/LanguageToggle";
import PasswordSlider from "./components/PasswordSlider/PasswordSlider";
import PasswordStrength from "./components/PasswordStrength/PasswordStrength";
import PasswordDisplay from "./components/PasswordDisplay/PasswordDisplay";
import Button from "./components/Button/Button";
import { usePasswordGenerator } from "./hooks/usePasswordGenerator/usePasswordGenerator";
import ArrowIcon from "./components/ArrowIcon/ArrowIcon";

function App() {
  const { t } = useTranslation();

  const {
    password,
    passwordLength,
    options,
    handlePasswordLengthChange,
    handleOptionChange,
    generatePassword,
  } = usePasswordGenerator();

  return (
    <main
      className={`
      flex items-start justify-center min-h-screen
      bg-gradient-to-r from-gradient-start to-gradient-end
      `}
    >
      <header className={`absolute top-4 right-4`}>
        <LanguageToggle />
      </header>

      <article className="flex flex-col gap-4 md:gap-6 w-[343px] md:w-[540px] mt-[65px] md:mt-[130px]">
        <h1 className="text-preset-4 md:mb-2 text-grey-600 text-center md:text-preset-2">
          {t("password_generator")}
        </h1>
        
        <PasswordDisplay password={password} />
        
        <section
          className={`
          w-full p-4 md:px-8 md:pt-6 md:pb-[41px] bg-grey-800 flex flex-col gap-8
          `}
          aria-label={t("password_configuration")}
        >
          <div role="group" aria-labelledby="length-control">
            <h2 id="length-control" className="sr-only">{t("length_configuration")}</h2>
            <PasswordSlider
              value={passwordLength}
              onChange={handlePasswordLengthChange}
              label={t("character_length")}
            />
          </div>
          
          <fieldset className="flex flex-col gap-4">
            <legend className="sr-only">{t("character_options")}</legend>
            <OptionCheckbox
              title={t("include_uppercase_letters")}
              checked={options.uppercase}
              onChange={handleOptionChange("uppercase")}
            />

            <OptionCheckbox
              title={t("include_lowercase_letters")}
              checked={options.lowercase}
              onChange={handleOptionChange("lowercase")}
            />

            <OptionCheckbox
              title={t("include_numbers")}
              checked={options.numbers}
              onChange={handleOptionChange("numbers")}
            />

            <OptionCheckbox
              title={t("include_symbols")}
              checked={options.symbols}
              onChange={handleOptionChange("symbols")}
            />
          </fieldset>
          
          <footer className="flex flex-col gap-4 md:gap-8">
            <PasswordStrength
              options={options}
              label={t("strength")}
              passwordLength={passwordLength}
            />
            <Button
              onClick={generatePassword}
              fullWidth
              icon={<ArrowIcon fill="currentColor" />}
              aria-label={t("generate_new_password")}
            >
              {t("generate")}
            </Button>
          </footer>
        </section>
      </article>
    </main>
  );
}

export default App;
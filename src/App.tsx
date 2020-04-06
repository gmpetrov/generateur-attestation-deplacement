import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Typography, DatePicker, Alert } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import SignaturePad from 'signature_pad';
import { PDFDocument } from 'pdf-lib';
import * as yup from 'yup';
import dayjs from 'dayjs';

import 'antd/dist/antd.css';
import './App.css';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const DATE_FORMAT = 'DD/MM/YYYY';

enum Fields {
  name = 'name',
  birthDay = 'birthDay',
  birthTown = 'birthTown',
  address = 'address',
  town = 'town',
  postalCode = 'postalCode',
  purpose = 'purpose',
  signature = 'signature',
}

const schema = yup.object().shape({
  [Fields.name]: yup.string().required(),
  [Fields.birthDay]: yup.string().required(),
  [Fields.birthTown]: yup.string().required(),
  [Fields.address]: yup.string().required(),
  [Fields.town]: yup.string().required(),
  [Fields.postalCode]: yup.string().required(),
  [Fields.purpose]: yup.string().required(),
});

type FormValues = yup.InferType<typeof schema>;

interface GenPDFprops extends FormValues {
  [Fields.signature]: string;
}

enum Purpose {
  pro = 'pro',
  grocery = 'grocery',
  health = 'health',
  family = 'family',
  sport = 'sport',
  judicial = 'judicial',
  generalInterest = 'generalInterest',
}

const PURPOSES = [
  {
    label: 'Pro',
    value: Purpose.pro,
  },
  {
    label: 'Achats de première nécessité',
    value: Purpose.grocery,
  },
  { label: 'Santé', value: Purpose.health },
  {
    label: 'Famille',
    value: Purpose.family,
  },
  {
    label: 'Déplacements brefs (max 1km) sport individuel',
    value: Purpose.sport,
  },
  {
    label: 'Convocation judiciaire ou administrative',
    value: Purpose.judicial,
  },
  {
    label: "Mission d'interêt général",
    value: Purpose.generalInterest,
  },
];

const { Option } = Select;
const { Title } = Typography;

function App() {
  const [signaturePad, setSignaturePad] = useState<SignaturePad | undefined>(
    undefined
  );
  const { handleSubmit, errors, control } = useForm<FormValues>({
    validationSchema: schema,
  });

  const onSubmit = async (values: FormValues) => {
    const fileName = 'attestation.pdf';
    const signature: string = signaturePad?.toDataURL() || '';

    const blob = await generatePdf({
      ...values,
      signature,
    });

    downloadBlob(blob, fileName);
  };

  const handleClearPad = () => {
    signaturePad?.clear();
  };

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = document.querySelector('canvas');

    if (canvas) {
      setSignaturePad(new SignaturePad(canvas));
    } else {
      console.log('no canvas');
    }
  }, []);

  return (
    <div className="App">
      <Title className="title">Générateur d'attestation de déplacement</Title>

      {/* <Alert
        className="alert"
        type="warning"
        message={
          <>
            <p>
              <a
                className="uppercase"
                href="https://www.liberation.fr/checknews/2020/03/18/confinement-peut-on-montrer-l-attestation-de-deplacement-sur-son-telephone_1782180"
                target="_blank"
                rel="noopener noreferrer"
              >
                L'attestation dématérialisée n'est plus autorisée, seule la
                version papier est acceptée (imprimée ou mansucrite).
              </a>
            </p>

            <br />

            <p>
              Vous pouvez trouver l'attestation officielle{' '}
              <a
                href="https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestation-de-deplacement-derogatoire-et-justificatif-de-deplacement-professionnel"
                target="_blank"
                rel="noopener noreferrer"
              >
                ici.
              </a>
            </p>
          </>
        }
      ></Alert> */}

      <Alert
        className="alert"
        type="info"
        message={
          <>
            <p>
              Il est désormais autorisé d'utiliser une attestation
              dématerialisée,{' '}
            </p>

            <p>
              Vous trouverez le générateur officiel du gouvernement{' '}
              <a
                href="https://media.interieur.gouv.fr/deplacement-covid-19/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ici
              </a>
            </p>
          </>
        }
        // description={}
      ></Alert>

      <a
        className="bmc-button"
        target="_blank"
        href="https://www.buymeacoffee.com/georges"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt="Buy me a coffee"
        />
        <span>Buy me a coffee</span>
      </a>

      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(errors).length > 0 && (
          <span className="form-error-label">
            Tous les champs sont obligatoires !
          </span>
        )}

        <Controller
          as={<Input placeholder="Nom" />}
          control={control}
          name={Fields.name}
        />

        <Controller
          as={
            <DatePicker
              placeholder="Date de naissance"
              name={Fields.birthDay}
              format={DATE_FORMAT}
            />
          }
          control={control}
          name={Fields.birthDay}
        />
        <Controller
          as={<Input placeholder="Lieu de naissance" />}
          control={control}
          name={Fields.birthTown}
        />
        <Controller
          as={
            <Input placeholder="Adresse" />

            // <PlacesAutocomplete value={addr} onChange={handleChangeAddr}>
            //   {({
            //     getInputProps,
            //     suggestions,
            //     getSuggestionItemProps,
            //     loading
            //   }) => (
            //     <AutoComplete
            //       onSelect={(value: any) => {
            //         setValue('address', value);
            //       }}
            //       options={suggestions.map(each => ({
            //         value: each.description
            //       }))}
            //     >
            //       <Input
            //         {...getInputProps({
            //           placeholder: 'Adresse'
            //         })}
            //       />
            //     </AutoComplete>
            //   )}
            // </PlacesAutocomplete>
          }
          control={control}
          name={Fields.address}
        />

        <Controller
          as={<Input placeholder="Ville" value="Lyon" />}
          control={control}
          name={Fields.town}
        />

        <Controller
          as={<Input placeholder="Code Postal" />}
          control={control}
          name={Fields.postalCode}
        />

        <Controller
          as={
            <Select placeholder="Motif">
              {PURPOSES.map((each, index) => (
                <Option key={index} value={each.value}>
                  {each.label}
                </Option>
              ))}
            </Select>
          }
          control={control}
          name="purpose"
        ></Controller>

        <span className="label">Signature:</span>

        <canvas></canvas>

        <a className="link clear-pad" onClick={handleClearPad}>
          Effacer signature
        </a>

        <Button type="primary" htmlType="submit">
          Générer PDF
        </Button>
      </form>

      <span className="footerText">
        Bon courage pendant le confinement, et sortez couvert 😷{' '}
      </span>

      <span className="footerText warning">
        Les données personnelles ne sont pas collectées (c'est à dire qu'aucune
        des informations ci-dessus n'est envoyée à aucun moment vers un serveur,
        tout reste uniquement sur votre téléphone)
      </span>

      <a
        className="link"
        href="https://github.com/gmpetrov/generateur-attestation-deplacement"
        target="_blank"
        rel="noopener noreferrer"
      >
        code source
      </a>

      <a className="link" href="mailto:georges@cool.ovh">
        contact
      </a>
    </div>
  );
}

const generatePdf = async ({
  name,
  birthDay,
  birthTown,
  address,
  town,
  postalCode,
  purpose,
  signature,
}: GenPDFprops) => {
  const TEXT_SIZE = 10;
  const formattedBirthDay = dayjs(birthDay).format(DATE_FORMAT);

  const bytes = await fetch('template.pdf').then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(bytes);

  const page = pdfDoc.getPages()[0];

  page.drawText(name, { x: 122, y: 685, size: TEXT_SIZE });
  page.drawText(formattedBirthDay, { x: 122, y: 661, size: TEXT_SIZE });
  page.drawText(birthTown, { x: 90, y: 637, size: TEXT_SIZE });
  page.drawText(`${address} ${postalCode} ${town}`, {
    x: 134,
    y: 613,
    size: TEXT_SIZE,
  });

  switch (purpose) {
    case Purpose.pro:
      page.drawText('x', { x: 77, y: 528, size: 17 });
      break;
    case Purpose.grocery:
      page.drawText('x', { x: 77, y: 478, size: 17 });
      break;
    case Purpose.health:
      page.drawText('x', { x: 77, y: 437, size: 17 });
      break;
    case Purpose.family:
      page.drawText('x', { x: 77, y: 401, size: 17 });
      break;
    case Purpose.sport:
      page.drawText('x', { x: 77, y: 345, size: 17 });
      break;
    case Purpose.judicial:
      page.drawText('x', { x: 77, y: 298, size: 17 });
      break;
    case Purpose.generalInterest:
      page.drawText('x', { x: 77, y: 262, size: 17 });
      break;
  }

  page.drawText(town, { x: 109, y: 225, size: TEXT_SIZE });

  const hourDoc = String(new Date().getHours());
  const minDoc = String(new Date().getMinutes());
  const dayDoc = new Date().getDate();
  const monthDoc = String(new Date().getMonth() + 1).padStart(2, '0');
  const yearDoc = new Date().getFullYear();

  page.drawText(`${dayDoc} / ${monthDoc} / ${yearDoc}`, {
    x: 93,
    y: 202,
    size: TEXT_SIZE,
  });

  page.drawText(hourDoc, { x: 195, y: 202, size: TEXT_SIZE });
  page.drawText(minDoc, { x: 224, y: 202, size: TEXT_SIZE });

  const signatureImg = await pdfDoc.embedPng(signature);
  const signatureDim = signatureImg.scale(1 / (signatureImg.width / 100));

  page.drawImage(signatureImg, {
    x: 134, //page.getWidth() - signatureDim.width - 50,
    y: 131,
    width: signatureDim.width,
    height: signatureDim.height,
  });

  const pdfBytes = await pdfDoc.save();

  return new Blob([pdfBytes], { type: 'application/pdf' });
};

const downloadBlob = (blob: Blob, fileName: string) => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.download = fileName;
  link.click();
};

export default App;

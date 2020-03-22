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
  address = 'address',
  town = 'town',
  postalCode = 'postalCode',
  purpose = 'purpose',
  signature = 'signature'
}

const schema = yup.object().shape({
  [Fields.name]: yup.string().required(),
  [Fields.birthDay]: yup.string().required(),
  [Fields.address]: yup.string().required(),
  [Fields.town]: yup.string().required(),
  [Fields.postalCode]: yup.string().required(),
  [Fields.purpose]: yup.string().required()
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
  sport = 'sport'
}

const PURPOSES = [
  {
    label: 'Pro',
    value: Purpose.pro
  },
  {
    label: 'Achats de première nécessité',
    value: Purpose.grocery
  },
  { label: 'Santé', value: Purpose.health },
  {
    label: 'Famille',
    value: Purpose.family
  },
  {
    label: 'Sport',
    value: Purpose.sport
  }
];

const { Option } = Select;
const { Title } = Typography;

function App() {
  const [signaturePad, setSignaturePad] = useState<SignaturePad | undefined>(
    undefined
  );
  const { handleSubmit, errors, control } = useForm<FormValues>({
    validationSchema: schema
  });

  const onSubmit = async (values: FormValues) => {
    const fileName = 'attestation.pdf';
    const signature: string = signaturePad?.toDataURL() || '';

    const blob = await generatePdf({
      ...values,
      signature
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

      <Alert
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
            {/* 
            <p>
              Afin de ne pas vous induire en erreur je désactive le générateur.
            </p> */}

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
        // description={}
      ></Alert>

      <Alert
        className="alert"
        type="info"
        message={
          <>
            <a
              href="https://www.getcontentstack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Besoin de tuer l'ennui ? Découvrez plein de contenus de qualités,
              sélectionnés à la main par des influenceurs 🎬📖
            </a>
          </>
        }
      ></Alert>

      <Alert
        className="alert"
        type="info"
        message={
          <>
            <p>
              Petition pour pouvoir utliser une attestation dématerialisée{' '}
              <a
                href="https://www.change.org/p/emmanuel-macron-pour-d%C3%A9mat%C3%A9rialiser-les-attestations-de-d%C3%A9placement-72e66b58-254e-42ad-9d50-41896a921102"
                target="_blank"
                rel="noopener noreferrer"
              >
                ici
              </a>
            </p>
          </>
        }
      ></Alert>

      {/* <Alert
        className="alert"
        type="info"
        message={
          <>
            <p>
              Pas besoin d'imprimer l'attestation de deplacement dérogatoire,{' '}
              <a
                href="https://www.numerama.com/politique/611777-attestation-de-deplacement-que-faire-sans-imprimante-ni-papier.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                une version numerique suffit.
              </a>
            </p>
            <a
              href="https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestation-de-deplacement-derogatoire-et-justificatif-de-deplacement-professionnel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plus d'informations sur le site officiel du gouvernement.
            </a>
          </>
        }
        // description={}
      ></Alert> */}

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
          as={<Input placeholder="Ville" />}
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
  address,
  town,
  postalCode,
  purpose,
  signature
}: GenPDFprops) => {
  const TEXT_SIZE = 10;
  const formattedBirthDay = dayjs(birthDay).format(DATE_FORMAT);

  const bytes = await fetch('template.pdf').then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(bytes);

  const page = pdfDoc.getPages()[0];

  page.drawText(name, { x: 135, y: 622, size: TEXT_SIZE });
  page.drawText(formattedBirthDay, { x: 135, y: 593, size: TEXT_SIZE });
  page.drawText(address, { x: 135, y: 559, size: TEXT_SIZE });
  page.drawText(`${postalCode} ${town}`, {
    x: 135,
    y: 544,
    size: TEXT_SIZE
  });

  switch (purpose) {
    case Purpose.pro:
      page.drawText('x', { x: 51, y: 425, size: 17 });
      break;
    case Purpose.grocery:
      page.drawText('x', { x: 51, y: 350, size: 17 });
      break;
    case Purpose.health:
      page.drawText('x', { x: 51, y: 305, size: 17 });
      break;
    case Purpose.family:
      page.drawText('x', { x: 51, y: 274, size: 17 });
      break;
    case Purpose.sport:
      page.drawText('x', { x: 51, y: 229, size: 17 });
      break;
  }

  page.drawText(town, { x: 375, y: 140, size: TEXT_SIZE });
  page.drawText(String(new Date().getDate()), {
    x: 478,
    y: 140,
    size: TEXT_SIZE
  });
  page.drawText(String(new Date().getMonth() + 1).padStart(2, '0'), {
    x: 502,
    y: 140,
    size: 10
  });

  const signatureImg = await pdfDoc.embedPng(signature);
  const signatureDim = signatureImg.scale(1 / (signatureImg.width / 150));

  page.drawImage(signatureImg, {
    x: page.getWidth() - signatureDim.width - 50,
    y: 30,
    width: signatureDim.width,
    height: signatureDim.height
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

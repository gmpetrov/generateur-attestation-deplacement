import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import {
  Input,
  AutoComplete,
  Select,
  Button,
  Typography,
  DatePicker,
  Alert
} from 'antd';
import SignaturePad from 'signature_pad';
import PlacesAutocomplete from 'react-places-autocomplete';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import dayjs from 'dayjs';

import 'antd/dist/antd.css';
import './App.css';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const schema = yup.object().shape({
  name: yup.string(),
  birthDay: yup.string(),
  address: yup.string(),
  town: yup.string(),
  postalCode: yup.string(),
  purpose: yup.string(),
  signature: yup.string()
});

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
  const [addr, setAddr] = useState<any>('');
  const [signaturePad, setSignaturePad] = useState<any>(undefined);
  const { register, handleSubmit, errors, control, setValue } = useForm({
    validationSchema: schema
  });

  const dateFormat = 'DD/MM/YYYY';

  const generatePdf = async ({
    name,
    birthDay,
    address,
    town,
    postalCode,
    purpose,
    signature
  }: any) => {
    const TEXT_SIZE = 10;
    const formattedBirthDay = dayjs(birthDay || '').format('DD/MM/YYYY');

    const bytes = await fetch('template.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(bytes);

    const page = pdfDoc.getPages()[0];

    page.drawText(name || '', { x: 135, y: 622, size: TEXT_SIZE });
    page.drawText(formattedBirthDay, { x: 135, y: 593, size: TEXT_SIZE });
    page.drawText(address || '', { x: 135, y: 559, size: TEXT_SIZE });
    page.drawText(`${postalCode || ''} ${town || ''}`, {
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

  const onSubmit = async (values: any) => {
    const fileName = 'attestation.pdf';
    const signature: string = signaturePad.toDataURL();

    const blob = await generatePdf({
      ...values,
      signature
    });

    downloadBlob(blob, fileName);
  };

  const handleClearPad = () => {
    signaturePad.clear();
  };

  useEffect(() => {
    const canvas = document.querySelector('canvas');

    setSignaturePad(new SignaturePad(canvas as any));
  }, []);

  return (
    <div className="App">
      <Title className="title">Générateur d'attestation de déplacement</Title>

      <Alert
        className="alert"
        type="info"
        message={
          <>
            <p>
              Il faut imprimer l'attestation de déplacement dérogatoire,{' '}
              <a
                href="https://www.numerama.com/politique/611777-attestation-de-deplacement-que-faire-sans-imprimante-ni-papier.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                une version numerique ne suffit pas.
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
      ></Alert>

      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<Input placeholder="Nom" name="name" />}
          control={control}
          name="name"
        />

        <Controller
          as={
            <DatePicker
              placeholder="Date de naissance"
              name="birthDay"
              format={dateFormat}
            />
          }
          control={control}
          name="birthDay"
        />

        <Controller
          as={
            <Input placeholder="Adresse" name="address" />

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
          name="address"
        />

        <Controller
          as={<Input placeholder="Ville" name="town" />}
          control={control}
          name="town"
        />

        <Controller
          as={<Input placeholder="Code Postal" name="postalCode" />}
          control={control}
          name="postalCode"
        />

        <Controller
          as={
            <Select
              placeholder="Motif"
              style={{ width: 120 }}
              // onChange={handleChange}
            >
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

export default App;

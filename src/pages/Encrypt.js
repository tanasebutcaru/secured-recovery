import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff, mdiDownload, mdiAlert, mdiChevronDoubleDown, mdiContentCopy } from '@mdi/js';
import encryptSecret from '../utils/encrypt-secret';
import { autoSizeTextarea } from '../utils/common';
import '../styles/encrypt.scss';

function Encrypt() {
  const { register, setValue, setFocus, handleSubmit, reset } = useForm();
  const [showEncryptionKey, setShowEncryptionKey] = useState(false);
  const [encryptionChunks, setEncryptionChunks] = useState(1);
  const [encryptedResult, setEncryptedResult] = useState({ error: false, errorMsg: '', chunks: [] });
  const [hasResult, setHasResult] = useState(false);
  const chunkDataRefs = useRef([]);

  const formStartOver = (startOverClean) => {
    setHasResult(false);
    chunkDataRefs.current = [];
  
    if (startOverClean) {
      setValue('encryptionChunks', 1);
      setEncryptionChunks(1);
      reset();
    }
  };

  const formSubmit = async (data, e) => {
    setEncryptedResult(await encryptSecret(data.secret, data.encryptionKey, parseInt(data.encryptionChunks, 10)));
    setHasResult(true);

    // autosize all chunk data secrets based on content length
    chunkDataRefs.current.forEach(chunkDataRef => autoSizeTextarea(chunkDataRef));
  };

  const handleEncryptionChunksChange = (e) => {
    setValue('encryptionChunks', e.target.value);
    setEncryptionChunks(e.target.value);
    setFocus('encryptionChunks');
  };

  const toggleEncryptionKeyVisibility = () => setShowEncryptionKey(prevState => !prevState);
  const onSubmit = async (data, e) => hasResult ? formStartOver(data.startOverClean) : await formSubmit(data, e);

  const downloadQRCodeChunk = (chunkNumber, chunkQRCodeDataURL) => {
    const aElement = document.createElement("a");
    aElement.href = chunkQRCodeDataURL;
    aElement.setAttribute("download", `encrypted-secret-chunk-${chunkNumber}-qrcode.png`);
    aElement.click();
  };

  const copySecretChunkToClipboard = (chunkNumber, chunkSecretData) => {
    const errorMessage = `Could not copy encrypted secret chunk #${chunkNumber} to clipboard. Please try again or perform a manual copy!`;

    try {
      navigator.clipboard.writeText(chunkSecretData)
        .then(() => alert(`Encrypted secret chunk #${chunkNumber} successfully copied to clipboard!`))
        .catch(error => alert(errorMessage)); // This will be the case for mobile devices
    } catch(error) {
      alert(errorMessage); // This will be the case for older/unsecured browsers
    }

    selectChunkDataContent(chunkNumber, chunkSecretData.length);
  };

  const selectChunkDataContent = (chunkIndex, contentLength) => {
    try {
      chunkDataRefs.current[chunkIndex].focus();
      chunkDataRefs.current[chunkIndex].setSelectionRange(0, contentLength);
    } catch(error) {
      // do nothing. 
    }
  };
  
  return (
    <>
      <form className="encrypt-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="secret-field form-field">
          <label htmlFor="secret">The secret *:</label>
          <textarea id="secret" {...register('secret', { required: true, disabled: hasResult })} rows="10"/>
        </div>
        <div className="encryption-settings-submit-group">
          <div className="encryption-chunks-field form-field">
            <label htmlFor="encryptionChunks">Split result in chunks:</label>
            <input id="encryptionChunks" {...register('encryptionChunks', { required: true, valueAsNumber: true, disabled: hasResult })} min="1" max="9" step="1" type="range" value={encryptionChunks} onChange={handleEncryptionChunksChange} />
            <span className="encryption-chunks-value">{encryptionChunks}</span>
          </div>
          <div className="encryption-key-field form-field">
            <label htmlFor="encryptionKey">Encryption key *:</label>
            <input id="encryptionKey" {...register('encryptionKey', { required: true, disabled: hasResult })} type={ showEncryptionKey ? 'text' : 'password' } />
            {showEncryptionKey && <Icon path={mdiEyeOff} size={1.2} onClick={toggleEncryptionKeyVisibility} title="Hide encryption key" />}
            {!showEncryptionKey && <Icon path={mdiEye} size={1.2} onClick={toggleEncryptionKeyVisibility} title="Show encryption key" />}
          </div>
          <button
            type="submit"
            className={hasResult ? 'form-start-over-btn' : 'form-submit-btn'}>
              {hasResult ? 'Start Over' : 'Encrypt Secret'}
          </button>
          {hasResult && <div className="encryption-startover-clean">
            <input id="startOverClean" {...register('startOverClean', { required: false })} type="checkbox" />
            <label htmlFor="startOverClean">Clean Start Over?</label>
          </div>}
        </div>
      </form>
      {hasResult && (
        <div className="encrypted-secret">
          <small className="notice">
            <Icon path={mdiChevronDoubleDown} size={1} title="See result below" />
            <span>Encrypted Secret</span>
            <Icon path={mdiChevronDoubleDown} size={1} title="See result below" />
          </small>
          {encryptedResult.error && (
            <div className="encrypted-result-error">
              <Icon path={mdiAlert} size={2} onClick={toggleEncryptionKeyVisibility} title="Error while encrypting secret" />
              <span>{encryptedResult.errorMsg}</span>
            </div>
          )}
          {encryptedResult.chunks.length && (
          <div className={`encrypted-result-success ${encryptedResult.chunks.length === 1 ? 'one-chunk': ''}`}>
            {encryptedResult.chunks.map((item, index) => (
              <div className={`encrypted-result-chunk chunk-${index+1}`} key={index}>
                <div className="chunk-number">Encrypted Secret | Chunk #{index+1}</div>
                <img className="chunk-qrcode-img" src={item.qrcodeDataURL} alt={`QRCode Chunk #${index+1}`}></img>
                <div className="chunk-operations">
                  <button className="chunk-qrcode-download" type="button" onClick={() => downloadQRCodeChunk(index+1, item.qrcodeDataURL)}>
                    <Icon path={mdiDownload} size={1} title="Download" />
                    <span>Download QRCode #{index+1}</span>
                  </button>
                  <div className="chunk-ops-andor">and/or</div>
                  <textarea
                    className="chunk-data"
                    value={item.data}
                    ref={ref => chunkDataRefs.current[index+1] = ref}
                    onClick={() => selectChunkDataContent(index+1, item.data.length)}
                    readOnly>
                  </textarea>
                  <button className="chunk-secret-copy" type="button" onClick={() => copySecretChunkToClipboard(index+1, item.data)}>
                    <Icon path={mdiContentCopy} size={1} title="Copy" />
                    <span>Copy Text #{index+1}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      )}
    </>
  );
}

export default Encrypt;

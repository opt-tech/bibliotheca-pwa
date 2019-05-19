import { SimpleTable } from 'bibliotheca/components/SimpleTable';
import { BarcodeLoaderModule } from 'bibliotheca/features/barcodeLoader/module';
import { Box, Button, Form, FormField, Image } from 'grommet';
import React from 'react';
import { useActions, useMappedState } from 'typeless';
import { BookRegisterActions } from '../interface';

const coverUrl = (isbn: string | null) => {
  if (isbn === null) {
    return '';
  }
  return `https://cover.openbd.jp/${isbn}.jpg`;
};

export const BookRegisterView = () => {
  const {
    bookData: { title, isbn },
  } = useMappedState(state => state.bookRegister);
  const { changeFormValue, submit } = useActions(BookRegisterActions);

  const rows = [
    {
      label: 'タイトル',
      render: () => (
        <FormField
          type="text"
          name="title"
          value={title || ''}
          onChange={e => changeFormValue('title', e.target.value)}
        />
      ),
    },
    {
      label: '画像',
      render: () => <Image fit="contain" src={coverUrl(isbn!)} />,
    },
    {
      label: 'ISBN (or JAN)',
      render: () => (
        <FormField
          type="text"
          name="isbn"
          value={isbn || ''}
          onChange={e => changeFormValue('isbn', e.target.value)}
        />
      ),
    },
  ];
  return (
    <>
      蔵書登録フォーム
      <Box align="center" justify="center">
        <BarcodeLoaderModule />
        <Form>
          <SimpleTable rows={rows} />
          <Button type="button" primary label="登録" onClick={submit} />
        </Form>
      </Box>
    </>
  );
};

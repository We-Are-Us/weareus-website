import { Entry, Asset } from 'contentful';

class EntryDecorator {
  private entry: Entry<any>;

  constructor(entry: Entry<any>) {
    this.entry = entry;
  }

  getTextField(fieldName: string) {
    const field = this.entry.fields[fieldName];

    if (field == null) {
      return '';
    }

    return field['en-NZ'] || field || '';
  }

  getAssetId(fieldName: string) {
    const asset: Asset = this.entry.fields[fieldName];

    if (asset == null) {
      return '';
    }

    const assetId = asset['en-NZ'] ? asset['en-NZ'].sys.id : asset.sys.id;

    return assetId;
  }

  getReferenceId(fieldName: string) {
    const reference = this.entry.fields[fieldName];

    if (reference == null) {
      return '';
    }

    const referenceId = reference['en-NZ']
      ? reference['en-NZ'].sys.id
      : reference.sys.id;

    return referenceId;
  }
}

export default EntryDecorator;

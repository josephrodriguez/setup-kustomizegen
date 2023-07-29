# Setup Kustomizegen GitHub Action

## Description

This GitHub Action sets up a specific version of Kustomizegen for your workflow.

Sure! Here's the reformatted section for Inputs:

## Inputs

| Name                 | Description                                    | Required | Default Value |
|----------------------|------------------------------------------------|----------|---------------|
| `kustomizegen-version` | The Kustomizegen version to set up.           | No       | 'latest'      |

## Example Usage

1. To set up a specific version of Kustomizegen:

```yaml
- name: Setup Kustomizegen v0.1.1
  uses: josephrodriguez/setup-kustomizegen@v1
  with:
    kustomizegen-version: '0.1.1'
```

2. To set up the latest version of Kustomizegen (using the default value):

```yaml
- name: Setup Kustomizegen (Latest)
  uses: josephrodriguez/setup-kustomizegen@v1
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
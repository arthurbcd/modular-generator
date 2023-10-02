# Modular Generator

![Modular Generator logo](assets/logo.png)

---

The **Modular Generator** is a dynamic Visual Studio Code extension tailored specifically for developers keen on clean architecture. This extension brings a host of streamlined, automated routines, empowering you to focus on your core development tasks.

## Features

- **Install Modular 🔥**

```txt
lib/
├─ main.dart
└─ app/
   ├─ module/
   │  └─ {module_name}/
   │     ├─ views/
   │     │   └─ {view_name}_page.dart
   │     │
   │     └─ {module_name}_module.dart
   │
   ├─ app_module.dart
   ├─ app_routes.dart
   └─ app_widget.dart
```

### Add/Update Module

Choose a module or create one and follow the prompts to update the binds and routes.

- Either `bind` or `page` prompt will ask you a list of names (without suffix!), separate each name with ','. Ex: 'user, auth'.

- All the pages will be generated with the Suffix 'Page'. Aditionally. The route path will automatically be added in the app_routes.dart 🥳.

- All the binds will be generated with the choosen Suffix (can be custom).

Obs: There are no templates. Just empty classes for binds and a StatelessWidget for page.

---

## Continuous Development

The Modular Generator is under active development, with plans to introduce more customization options:

- Custom Suffix and Folder Names ✅
- Custom Interfaces
- Remove a Module
- Inserting Module as ModuleRoute
- Custom Template defined by path + suffix

---

## Requirements

- Visual Studio Code version 1.65.0 or later

## License

This project is licensed under the MIT License.

## Support and Feedback

- Report issues on the [GitHub repository](https://github.com/arthurbcd/modular-generator/issues)
- Contact the author at [ux.arthur@gmail.com](mailto:ux.arthur@gmail.com)

## Contributing

Contributions are welcome! Check out the [repository](https://github.com/arthurbcd/modular-generator.git) and feel free to submit pull requests or create issues.

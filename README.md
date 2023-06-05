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
   │     ├─ repositories/
   │     ├─ services/
   │     ├─ views/
   │     │  └─ {view_name}/
   │     │     ├─ {view_name}_controller.dart
   │     │     └─ {view_name}_page.dart
   │     │
   │     └─ {module_name}_module.dart
   │
   ├─ app_module.dart
   ├─ app_routes.dart
   └─ app_widget.dart
```

### Add Module

Our **Add Module** feature brings a set of automated procedures for component generation:

- **Add View**: Modular Generator automatically generates Page, Controller, and binds them together with ChildRoute. Also integrates it into your `AppRoutes`.
- **Add Service**: Automate creation and binding of services, eliminating manual entry.
- **Add Repository**: Automate creation and binding of repositories, eliminating manual entry.

By simplifying these integral procedures, Modular Generator lets you concentrate on what's crucial - delivering high-quality code.

### Update Module

Choose a module and follow the prompts to update the Moduele, with View, Service, or Repository updates.

---

## Philosophy

With the focus on modular design, Modular Generator encourages a more manageable folder structure. The Controller, Page, and Widget components are tied together logically rather than strewn about in a flat structure. Over time, this approach significantly reduces cognitive overhead and prevents confusion, fostering long-term codebase maintenance and comprehensibility.

Modular Generator promotes a parallel module structure. There are no nested submodules within another module, mitigating confusion and ensuring each module remains self-contained and independent.

Having experimented with various project structures, like ModuleRoutes and WidgetModule for Page/Controller, we found this strategy to be the most effective. It promotes transparency and ease of access by avoiding hidden modules and consolidating all dependencies into a singular, accessible location.

An example of the envisioned structure is as follows:

```dart
class AuthModule extends Module {
  @override
  final List<Bind> binds = [
    // * Repositories
    AutoBind.lazySingleton(ServerAuthRepository.new),

    // * Services
    AutoBind.lazySingleton(ServerAuthService.new),
    AutoBind.lazySingleton(GoogleAuthService.new),
    AutoBind.lazySingleton(FacebookAuthService.new),

    // * Controllers
    AutoBind.lazySingleton(LoginController.new),
    AutoBind.lazySingleton(RegisterController.new),
  ];

  @override
  final List<ModularRoute> routes = [
    ChildRoute('/login/', child: (_, args) => const LoginPage()),
    ChildRoute('/register/', child: (_, args) => const RegisterPage()),
  ];
}
```

Which would look like this:

```txt
└─ auth/
   ├─ repositories/
   ├─ services/
   ├─ views/
   │  ├─ login/
   │  │  ├─ login_controller.dart
   │  │  └─ login_page.dart
   │  └─ register/
   │     ├─ register_controller.dart
   │     └─ register_page.dart
   │
   └─ auth_module.dart
```

## Continuous Development

The Modular Generator is under active development, with plans to introduce more customization options while respecting our fundamental principles.

- Custom Suffix and Folder Names
- Custom Interfaces
- Remove a Module
- Inserting Module as ModuleRoute

You might notice the absence of shared/core folders or models in the module structure we provide. This isn't an oversight, but a conscious decision.

While these components are indeed vital to any project, we believe that the management of these elements should be left to the developer's discretion. The Modular Generator extension does not dictate your project's overall architecture. Instead, it focuses on automating the aspects related to module generation and management.

This approach allows you to leverage the benefits of the Modular Generator while retaining complete control over the organization of your core and shared components.

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

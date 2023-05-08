import 'dart:convert';

// Name: Dart Safe Data Class Generator
// VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ArthurMiranda.dart-safe-data-class
class Template {
  Template({
    required this.id,
  });

  factory Template.fromJson(String source) =>
      Template.fromMap(json.decode(source));

  factory Template.fromMap(Map<String, dynamic> map) {
    T isA<T>(k) => map[k] is T ? map[k] : throw ArgumentError.value(map[k], k);
    return Template(
      id: isA<String>('id'),
    );
  }

  final String id;

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Template && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() => 'Template(id: $id)';

  Template copyWith({
    String? id,
  }) {
    return Template(
      id: id ?? this.id,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }

  String toJson() => json.encode(toMap());
}
